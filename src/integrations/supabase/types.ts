export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      admin_audit_logs: {
        Row: {
          action: string
          admin_user_id: string
          created_at: string
          details: Json
          id: string
          target_user_id: string | null
        }
        Insert: {
          action: string
          admin_user_id: string
          created_at?: string
          details?: Json
          id?: string
          target_user_id?: string | null
        }
        Update: {
          action?: string
          admin_user_id?: string
          created_at?: string
          details?: Json
          id?: string
          target_user_id?: string | null
        }
        Relationships: []
      }
      appointments: {
        Row: {
          client_id: string | null
          created_at: string | null
          customer_name: string | null
          customer_phone: string | null
          end_time: string
          id: string
          notes: string | null
          service_id: string | null
          start_time: string
          status: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          client_id?: string | null
          created_at?: string | null
          customer_name?: string | null
          customer_phone?: string | null
          end_time: string
          id?: string
          notes?: string | null
          service_id?: string | null
          start_time: string
          status?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          client_id?: string | null
          created_at?: string | null
          customer_name?: string | null
          customer_phone?: string | null
          end_time?: string
          id?: string
          notes?: string | null
          service_id?: string | null
          start_time?: string
          status?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "appointments_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      billing_history: {
        Row: {
          amount_cents: number
          created_at: string
          currency: string
          external_id: string | null
          gateway: string
          id: string
          metadata: Json
          paid_at: string | null
          receipt_url: string | null
          status: Database["public"]["Enums"]["payment_status"]
          subscription_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          amount_cents?: number
          created_at?: string
          currency?: string
          external_id?: string | null
          gateway: string
          id?: string
          metadata?: Json
          paid_at?: string | null
          receipt_url?: string | null
          status?: Database["public"]["Enums"]["payment_status"]
          subscription_id?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          amount_cents?: number
          created_at?: string
          currency?: string
          external_id?: string | null
          gateway?: string
          id?: string
          metadata?: Json
          paid_at?: string | null
          receipt_url?: string | null
          status?: Database["public"]["Enums"]["payment_status"]
          subscription_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "billing_history_subscription_id_fkey"
            columns: ["subscription_id"]
            isOneToOne: false
            referencedRelation: "subscriptions"
            referencedColumns: ["id"]
          },
        ]
      }
      clients: {
        Row: {
          birthday: string | null
          created_at: string | null
          id: string
          instagram: string | null
          last_visit: string | null
          name: string
          notes: string | null
          phone: string | null
          photo_url: string | null
          total_spent: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          birthday?: string | null
          created_at?: string | null
          id?: string
          instagram?: string | null
          last_visit?: string | null
          name: string
          notes?: string | null
          phone?: string | null
          photo_url?: string | null
          total_spent?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          birthday?: string | null
          created_at?: string | null
          id?: string
          instagram?: string | null
          last_visit?: string | null
          name?: string
          notes?: string | null
          phone?: string | null
          photo_url?: string | null
          total_spent?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      customer_memberships: {
        Row: {
          client_id: string
          created_at: string | null
          end_date: string
          id: string
          plan_id: string
          start_date: string
          status: string
          updated_at: string | null
        }
        Insert: {
          client_id: string
          created_at?: string | null
          end_date: string
          id?: string
          plan_id: string
          start_date?: string
          status?: string
          updated_at?: string | null
        }
        Update: {
          client_id?: string
          created_at?: string | null
          end_date?: string
          id?: string
          plan_id?: string
          start_date?: string
          status?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "customer_memberships_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customer_memberships_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "vip_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      financial_records: {
        Row: {
          amount: number
          appointment_id: string | null
          category: string | null
          created_at: string | null
          date: string
          description: string | null
          id: string
          type: string
          user_id: string
        }
        Insert: {
          amount: number
          appointment_id?: string | null
          category?: string | null
          created_at?: string | null
          date?: string
          description?: string | null
          id?: string
          type: string
          user_id: string
        }
        Update: {
          amount?: number
          appointment_id?: string | null
          category?: string | null
          created_at?: string | null
          date?: string
          description?: string | null
          id?: string
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "financial_records_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "appointments"
            referencedColumns: ["id"]
          },
        ]
      }
      payment_gateway_errors: {
        Row: {
          created_at: string
          external_id: string | null
          gateway: string
          http_status: number | null
          id: string
          message: string
          operation: string
          payload: Json | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          external_id?: string | null
          gateway: string
          http_status?: number | null
          id?: string
          message: string
          operation: string
          payload?: Json | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          external_id?: string | null
          gateway?: string
          http_status?: number | null
          id?: string
          message?: string
          operation?: string
          payload?: Json | null
          user_id?: string | null
        }
        Relationships: []
      }
      products: {
        Row: {
          cost_price: number | null
          created_at: string | null
          current_stock: number
          description: string | null
          id: string
          min_stock: number
          name: string
          purchase_price: number | null
          sale_price: number | null
          selling_price: number | null
          sku: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          cost_price?: number | null
          created_at?: string | null
          current_stock?: number
          description?: string | null
          id?: string
          min_stock?: number
          name: string
          purchase_price?: number | null
          sale_price?: number | null
          selling_price?: number | null
          sku?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          cost_price?: number | null
          created_at?: string | null
          current_stock?: number
          description?: string | null
          id?: string
          min_stock?: number
          name?: string
          purchase_price?: number | null
          sale_price?: number | null
          selling_price?: number | null
          sku?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          barber_shop_name: string | null
          brand_color: string | null
          business_address: string | null
          business_city: string | null
          business_instagram: string | null
          business_phone: string | null
          business_state: string | null
          business_whatsapp: string | null
          business_zip: string | null
          country: string
          created_at: string | null
          currency: string
          date_format: string
          enabled_modules: Json | null
          full_name: string | null
          id: string
          language: string
          monthly_goal: number | null
          notification_preferences: Json | null
          onboarding_completed_at: string | null
          opening_hours: Json | null
          slug: string | null
          time_format: string
          timezone: string
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          barber_shop_name?: string | null
          brand_color?: string | null
          business_address?: string | null
          business_city?: string | null
          business_instagram?: string | null
          business_phone?: string | null
          business_state?: string | null
          business_whatsapp?: string | null
          business_zip?: string | null
          country?: string
          created_at?: string | null
          currency?: string
          date_format?: string
          enabled_modules?: Json | null
          full_name?: string | null
          id: string
          language?: string
          monthly_goal?: number | null
          notification_preferences?: Json | null
          onboarding_completed_at?: string | null
          opening_hours?: Json | null
          slug?: string | null
          time_format?: string
          timezone?: string
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          barber_shop_name?: string | null
          brand_color?: string | null
          business_address?: string | null
          business_city?: string | null
          business_instagram?: string | null
          business_phone?: string | null
          business_state?: string | null
          business_whatsapp?: string | null
          business_zip?: string | null
          country?: string
          created_at?: string | null
          currency?: string
          date_format?: string
          enabled_modules?: Json | null
          full_name?: string | null
          id?: string
          language?: string
          monthly_goal?: number | null
          notification_preferences?: Json | null
          onboarding_completed_at?: string | null
          opening_hours?: Json | null
          slug?: string | null
          time_format?: string
          timezone?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      promotional_license_redemptions: {
        Row: {
          id: string
          license_id: string
          metadata: Json
          redeemed_at: string
          user_id: string
        }
        Insert: {
          id?: string
          license_id: string
          metadata?: Json
          redeemed_at?: string
          user_id: string
        }
        Update: {
          id?: string
          license_id?: string
          metadata?: Json
          redeemed_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "promotional_license_redemptions_license_id_fkey"
            columns: ["license_id"]
            isOneToOne: false
            referencedRelation: "promotional_licenses"
            referencedColumns: ["id"]
          },
        ]
      }
      promotional_licenses: {
        Row: {
          active: boolean
          code: string
          created_at: string
          created_by: string | null
          expires_at: string | null
          id: string
          lifetime: boolean
          max_uses: number | null
          months_granted: number
          plan: Database["public"]["Enums"]["subscription_plan"]
          updated_at: string
        }
        Insert: {
          active?: boolean
          code: string
          created_at?: string
          created_by?: string | null
          expires_at?: string | null
          id?: string
          lifetime?: boolean
          max_uses?: number | null
          months_granted?: number
          plan?: Database["public"]["Enums"]["subscription_plan"]
          updated_at?: string
        }
        Update: {
          active?: boolean
          code?: string
          created_at?: string
          created_by?: string | null
          expires_at?: string | null
          id?: string
          lifetime?: boolean
          max_uses?: number | null
          months_granted?: number
          plan?: Database["public"]["Enums"]["subscription_plan"]
          updated_at?: string
        }
        Relationships: []
      }
      schedule_blocks: {
        Row: {
          block_type: string
          created_at: string
          end_time: string
          id: string
          notes: string | null
          start_time: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          block_type?: string
          created_at?: string
          end_time: string
          id?: string
          notes?: string | null
          start_time: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          block_type?: string
          created_at?: string
          end_time?: string
          id?: string
          notes?: string | null
          start_time?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      services: {
        Row: {
          active: boolean
          color: string
          created_at: string | null
          description: string | null
          duration_minutes: number
          id: string
          name: string
          price: number
          updated_at: string | null
          user_id: string
        }
        Insert: {
          active?: boolean
          color?: string
          created_at?: string | null
          description?: string | null
          duration_minutes?: number
          id?: string
          name: string
          price: number
          updated_at?: string | null
          user_id: string
        }
        Update: {
          active?: boolean
          color?: string
          created_at?: string | null
          description?: string | null
          duration_minutes?: number
          id?: string
          name?: string
          price?: number
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          created_at: string
          current_period_end: string | null
          current_period_start: string | null
          grace_period_until: string | null
          id: string
          payment_provider: string | null
          plan: Database["public"]["Enums"]["subscription_plan"]
          provider_customer_id: string | null
          provider_subscription_id: string | null
          status: Database["public"]["Enums"]["subscription_status"]
          trial_ends_at: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          grace_period_until?: string | null
          id?: string
          payment_provider?: string | null
          plan?: Database["public"]["Enums"]["subscription_plan"]
          provider_customer_id?: string | null
          provider_subscription_id?: string | null
          status?: Database["public"]["Enums"]["subscription_status"]
          trial_ends_at?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          grace_period_until?: string | null
          id?: string
          payment_provider?: string | null
          plan?: Database["public"]["Enums"]["subscription_plan"]
          provider_customer_id?: string | null
          provider_subscription_id?: string | null
          status?: Database["public"]["Enums"]["subscription_status"]
          trial_ends_at?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      vip_plans: {
        Row: {
          created_at: string | null
          id: string
          includes: Json
          is_active: boolean
          name: string
          price: number
          updated_at: string | null
          user_id: string
          validity_days: number
        }
        Insert: {
          created_at?: string | null
          id?: string
          includes?: Json
          is_active?: boolean
          name: string
          price: number
          updated_at?: string | null
          user_id: string
          validity_days?: number
        }
        Update: {
          created_at?: string | null
          id?: string
          includes?: Json
          is_active?: boolean
          name?: string
          price?: number
          updated_at?: string | null
          user_id?: string
          validity_days?: number
        }
        Relationships: [
          {
            foreignKeyName: "vip_plans_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      webhook_events: {
        Row: {
          created_at: string
          error: string | null
          event_type: string
          external_event_id: string | null
          gateway: string
          id: string
          payload: Json
          processed_at: string | null
        }
        Insert: {
          created_at?: string
          error?: string | null
          event_type: string
          external_event_id?: string | null
          gateway: string
          id?: string
          payload: Json
          processed_at?: string | null
        }
        Update: {
          created_at?: string
          error?: string | null
          event_type?: string
          external_event_id?: string | null
          gateway?: string
          id?: string
          payload?: Json
          processed_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      schedule_blocks_public: {
        Row: {
          end_time: string | null
          start_time: string | null
          user_id: string | null
        }
        Insert: {
          end_time?: string | null
          start_time?: string | null
          user_id?: string | null
        }
        Update: {
          end_time?: string | null
          start_time?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      apply_payment_confirmed: {
        Args: {
          _period_days?: number
          _plan?: Database["public"]["Enums"]["subscription_plan"]
          _user_id: string
        }
        Returns: undefined
      }
      apply_payment_failed: { Args: { _user_id: string }; Returns: undefined }
      cancel_user_subscription: {
        Args: { _user_id: string }
        Returns: undefined
      }
      change_plan_after_payment: {
        Args: {
          _new_plan: Database["public"]["Enums"]["subscription_plan"]
          _period_days?: number
          _user_id: string
        }
        Returns: undefined
      }
      expire_overdue_trials: { Args: never; Returns: undefined }
      generate_slug: { Args: { name: string }; Returns: string }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      suspend_overdue_subscriptions: { Args: never; Returns: undefined }
    }
    Enums: {
      app_role: "admin" | "user" | "owner" | "support"
      appointment_status:
        | "scheduled"
        | "confirmed"
        | "in_progress"
        | "completed"
        | "cancelled"
        | "no_show"
      payment_status:
        | "pending"
        | "confirmed"
        | "failed"
        | "refunded"
        | "cancelled"
      subscription_plan: "starter" | "professional" | "premium" | "lifetime"
      subscription_status:
        | "trial"
        | "active"
        | "overdue"
        | "suspended"
        | "cancelled"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user", "owner", "support"],
      appointment_status: [
        "scheduled",
        "confirmed",
        "in_progress",
        "completed",
        "cancelled",
        "no_show",
      ],
      payment_status: [
        "pending",
        "confirmed",
        "failed",
        "refunded",
        "cancelled",
      ],
      subscription_plan: ["starter", "professional", "premium", "lifetime"],
      subscription_status: [
        "trial",
        "active",
        "overdue",
        "suspended",
        "cancelled",
      ],
    },
  },
} as const
