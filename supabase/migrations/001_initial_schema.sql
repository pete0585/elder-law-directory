-- Elder Law Attorney Directory Schema
-- Supabase project: fbuqrnzofktepkzyfmhy

-- Drop bootstrap tables if they exist (bootstrap creates generic schema)
DROP TABLE IF EXISTS elder_law_reviews CASCADE;
DROP TABLE IF EXISTS elder_law_payments CASCADE;
DROP TABLE IF EXISTS elder_law_claims CASCADE;
DROP TABLE IF EXISTS elder_law_listings CASCADE;

-- ─── elder_listings ───────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS elder_listings (
  id                      UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  slug                    TEXT        UNIQUE NOT NULL,
  full_name               TEXT        NOT NULL,
  firm_name               TEXT,
  bio                     TEXT,
  photo_url               TEXT,
  phone                   TEXT,
  email                   TEXT,
  website                 TEXT,
  address_line1           TEXT,
  city                    TEXT        NOT NULL,
  state                   TEXT        NOT NULL,
  zip                     TEXT,
  latitude                DOUBLE PRECISION,
  longitude               DOUBLE PRECISION,
  practice_areas          TEXT[]      DEFAULT '{}',
  states_licensed         TEXT[]      DEFAULT '{}',
  is_naela_member         BOOLEAN     DEFAULT false,
  is_cela_certified       BOOLEAN     DEFAULT false,
  accepts_remote          BOOLEAN     DEFAULT false,
  free_consultation       BOOLEAN     DEFAULT false,
  listing_tier            TEXT        DEFAULT 'free'   CHECK (listing_tier IN ('free','verified','featured')),
  is_active               BOOLEAN     DEFAULT true,
  is_approved             BOOLEAN     DEFAULT true,
  stripe_customer_id      TEXT,
  stripe_subscription_id  TEXT,
  subscription_expires_at TIMESTAMPTZ,
  claimed_at              TIMESTAMPTZ,
  claimed_by              TEXT,
  source                  TEXT,
  do_not_email            BOOLEAN     DEFAULT false,
  email_source            TEXT,
  outreach_sent_at        TIMESTAMPTZ,
  outreach_last_step      INTEGER     DEFAULT 0,
  upgrade_nudge_step      INTEGER     DEFAULT 0,
  upgrade_nudge_sent_at   TIMESTAMPTZ,
  search_vector           TSVECTOR,
  created_at              TIMESTAMPTZ DEFAULT now(),
  updated_at              TIMESTAMPTZ DEFAULT now()
);

-- Full-text search trigger
CREATE OR REPLACE FUNCTION elder_listings_search_vector_update()
RETURNS TRIGGER AS $$
BEGIN
  NEW.search_vector :=
    setweight(to_tsvector('english', coalesce(NEW.full_name, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(NEW.firm_name, '')), 'B') ||
    setweight(to_tsvector('english', coalesce(NEW.city, '')), 'C') ||
    setweight(to_tsvector('english', coalesce(NEW.state, '')), 'C') ||
    setweight(to_tsvector('english', array_to_string(NEW.practice_areas, ' ')), 'D');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS elder_listings_tsvector_update ON elder_listings;
CREATE TRIGGER elder_listings_tsvector_update
  BEFORE INSERT OR UPDATE ON elder_listings
  FOR EACH ROW EXECUTE FUNCTION elder_listings_search_vector_update();

-- Indexes
CREATE INDEX IF NOT EXISTS elder_listings_state_idx            ON elder_listings(state);
CREATE INDEX IF NOT EXISTS elder_listings_city_idx             ON elder_listings(city);
CREATE INDEX IF NOT EXISTS elder_listings_tier_idx             ON elder_listings(listing_tier);
CREATE INDEX IF NOT EXISTS elder_listings_active_approved_idx  ON elder_listings(is_active, is_approved);
CREATE INDEX IF NOT EXISTS elder_listings_search_vector_idx    ON elder_listings USING GIN(search_vector);
CREATE INDEX IF NOT EXISTS elder_listings_slug_idx             ON elder_listings(slug);
CREATE INDEX IF NOT EXISTS elder_listings_practice_areas_idx   ON elder_listings USING GIN(practice_areas);


-- ─── elder_claims ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS elder_claims (
  id            UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id    UUID        REFERENCES elder_listings(id),
  email         TEXT        NOT NULL,
  token         TEXT        NOT NULL UNIQUE,
  verified      BOOLEAN     DEFAULT false,
  verified_at   TIMESTAMPTZ,
  expires_at    TIMESTAMPTZ NOT NULL,
  status        TEXT        DEFAULT 'pending',
  nudge_sent_at TIMESTAMPTZ,
  created_at    TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS elder_claims_listing_id_idx ON elder_claims(listing_id);
CREATE INDEX IF NOT EXISTS elder_claims_token_idx      ON elder_claims(token);


-- ─── elder_payments ───────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS elder_payments (
  id                       UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id               UUID        REFERENCES elder_listings(id),
  stripe_session_id        TEXT,
  stripe_payment_intent_id TEXT,
  amount                   INTEGER,
  tier                     TEXT,
  status                   TEXT,
  created_at               TIMESTAMPTZ DEFAULT now()
);


-- ─── elder_leads ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS elder_leads (
  id                   UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  family_name          TEXT,
  family_phone         TEXT,
  family_email         TEXT,
  situation_description TEXT,
  state                TEXT,
  urgency              TEXT        DEFAULT 'standard',
  routed_to            UUID        REFERENCES elder_listings(id),
  lead_fee             INTEGER,
  status               TEXT        DEFAULT 'new',
  created_at           TIMESTAMPTZ DEFAULT now()
);


-- ─── admin_users ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS admin_users (
  id         UUID  PRIMARY KEY REFERENCES auth.users(id),
  role       TEXT  NOT NULL DEFAULT 'admin',
  created_at TIMESTAMPTZ DEFAULT now()
);


-- ─── Row-Level Security ───────────────────────────────────────────────────────
ALTER TABLE elder_listings  ENABLE ROW LEVEL SECURITY;
ALTER TABLE elder_claims    ENABLE ROW LEVEL SECURITY;
ALTER TABLE elder_payments  ENABLE ROW LEVEL SECURITY;
ALTER TABLE elder_leads     ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users     ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read active listings"
  ON elder_listings FOR SELECT
  USING (is_active = true AND is_approved = true);

CREATE POLICY "Service role full access listings"
  ON elder_listings FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access claims"
  ON elder_claims FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access payments"
  ON elder_payments FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access leads"
  ON elder_leads FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access admin_users"
  ON admin_users FOR ALL
  USING (auth.role() = 'service_role');
