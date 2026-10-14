I will transform "Corte Certo" into a functional daily tool for barbers by implementing real-time data fetching, complete CRUD operations for core modules, and a streamlined checkout flow.

### 1. Dashboard Enhancements
- Replace placeholder stats with real-time data:
  - **Next Appointment**: Fetches the closest upcoming scheduled service.
  - **Daily Revenue**: Aggregates income from financial records for the current day.
  - **Completed Services**: Counts the number of finished appointments today.
  - **Low Stock Alert**: Counts products below their minimum defined threshold.
  - **Inactive Clients**: Identifies clients who haven't visited in the last 30 days.

### 2. Core Module CRUD Operations
- **Services**: Implement forms to create, edit, and delete services (price, duration, active status).
- **Clients**: Implement forms for quick registration and editing (phone, notes, birthday).
- **Inventory**: Implement product management with profit margin calculations and stock tracking.
- **Finance**: Add manual entry for income/expenses and view daily/weekly/monthly summaries.

### 3. Operational Workflow (Agenda & Checkout)
- **Agenda**: Enable scheduling, rescheduling, and cancellation of appointments.
- **Checkout Flow**: 
  - Add a "Complete Service" button in the agenda.
  - Create a Checkout Modal to:
    - Select/Confirm final price and payment method (Pix, Card, Cash).
    - Automatically update appointment status to 'completed'.
    - Automatically create a financial record (Income).
    - Update client's last visit date and total lifetime spent.

### 4. User Experience & Mobile-First
- Add specialized "Empty States" with clear CTAs (e.g., "Add your first service" instead of a blank screen).
- Ensure all forms and buttons are touch-friendly and optimized for mobile screens.
- Add "Error Boundaries" and "Loading Skeletons" for a professional feel during data transitions.

### Technical Details
- **Stack**: React, TanStack Router (file-based), TanStack Query (fetching), Supabase (DB/Auth), Tailwind + Shadcn UI.
- **Database**: Use existing tables `services`, `clients`, `appointments`, `products`, and `financial_records`.
- **Modals**: Use Shadcn `Dialog` and `Sheet` components for all creation/editing flows to keep the user in context.
