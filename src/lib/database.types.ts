export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      projects: {
        Row: {
          id: string
          slug: string
          title: string
          type: string
          location: string
          description: string
          completion_date: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          slug: string
          title: string
          type: string
          location: string
          description: string
          completion_date: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          slug?: string
          title?: string
          type?: string
          location?: string
          description?: string
          completion_date?: string
          created_at?: string
          updated_at?: string
        }
      }
      project_categories: {
        Row: {
          id: string
          name: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          created_at?: string
        }
      }
      project_category_mappings: {
        Row: {
          project_id: string
          category_id: string
          created_at: string
        }
        Insert: {
          project_id: string
          category_id: string
          created_at?: string
        }
        Update: {
          project_id?: string
          category_id?: string
          created_at?: string
        }
      }
      project_assets: {
        Row: {
          id: string
          project_id: string
          url: string
          type: string
          is_cover: boolean
          order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          project_id: string
          url: string
          type: string
          is_cover?: boolean
          order: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          project_id?: string
          url?: string
          type?: string
          is_cover?: boolean
          order?: number
          created_at?: string
          updated_at?: string
        }
      }
      testimonials: {
        Row: {
          id: string
          name: string
          location: string
          rating: number
          text: string
          avatar_url: string | null
          is_featured: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          location: string
          rating: number
          text: string
          avatar_url?: string | null
          is_featured?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          location?: string
          rating?: number
          text?: string
          avatar_url?: string | null
          is_featured?: boolean
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}