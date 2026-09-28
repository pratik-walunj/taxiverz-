CREATE TABLE "lead_deliveries" (
	"id" serial PRIMARY KEY NOT NULL,
	"lead_id" uuid NOT NULL,
	"sink" text NOT NULL,
	"status" text DEFAULT 'pending' NOT NULL,
	"attempts" integer DEFAULT 0 NOT NULL,
	"next_attempt_at" timestamp with time zone,
	"last_error" text,
	"delivered_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "leads" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"ref" text NOT NULL,
	"type" text NOT NULL,
	"name" text NOT NULL,
	"phone" text NOT NULL,
	"email" text,
	"pickup_address" text,
	"message" text,
	"trip" jsonb,
	"fare" jsonb,
	"client_total" integer,
	"whatsapp_opt_in" boolean DEFAULT false NOT NULL,
	"attribution" jsonb,
	"page" text NOT NULL,
	"user_agent" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"last_contact_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "leads_ref_unique" UNIQUE("ref")
);
--> statement-breakpoint
ALTER TABLE "lead_deliveries" ADD CONSTRAINT "lead_deliveries_lead_id_leads_id_fk" FOREIGN KEY ("lead_id") REFERENCES "public"."leads"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "lead_deliveries_due_idx" ON "lead_deliveries" USING btree ("status","next_attempt_at");--> statement-breakpoint
CREATE INDEX "leads_phone_idx" ON "leads" USING btree ("phone");--> statement-breakpoint
CREATE INDEX "leads_last_contact_idx" ON "leads" USING btree ("last_contact_at");