export interface EmployeesType {
    id: number;
    name: string;
    nip: string;
    position: string;
    profile_picture: string;
  }

export interface DataRecordsType {
    attendance?: string;
    attendance_date?: string;
    attendance_status?: string;
    clock_in?: string;
    clock_in_location?: string;
    clock_in_map_location?: string;
    clock_out?: string;
    clock_out_location?: string;
    clock_out_map_location?: string;
    id?: number;
    work_time?: string;
  }

export interface ProfileType {
    id?: number;
    profile_picture?: string;
    name?: string;
    birth_of_date?: string;
    nip?: string;
    email?: string;
    gender?: string;
    position?: string;
    phone?: string;
    address?: string;
    annual_leave?: number;
  }

 export interface InboxType {
    id: number;
    announcement_title: string;
    announcement_description: string;
  }

 export interface LocationType {
    city?: string;
    country?: string;
    postal_code?: string;
    state?: string;
    street?: string;
    url_osm?: string;
  }

  export interface SettingsType {
    annual_leave?: number;
    id?: number;
    tolerance?: number;
    working_hour_end?: string;
    working_hour_start?: string;
  }

  export interface GrpahType {
    employee_name: string;
    employee_nip: string;
    monthly_total_working_hour: number;
    monthly_total_employee_late: number;
  }

  export interface ApprovalType {
    id: number;
    employee_name: string;
    created_at: string;
    approval_title: string;
    approval_status: string;
    approval_start_date: string;
    approval_description: string;
    approval_end_date: string;
    approval_image: string;
  }

  export interface CompanyData {
    company_address?: string;
    company_phone?: string;
    description?: string;
    company_email?: string;
    id?: number;
    company_name?: string;
    company_picture?: string;
    sosmed?: string;
  }

  export interface CreateInboxType {
    id: number;
    to: string;
    nip: string;
    announcement_title: string;
    announcement_description: string;
    created_at: string;
  }

  export interface InboxIdType {
    id?: number;
    to?: string;
    nip?: string;
    announcement_title?: string;
    announcement_description?: string;
    created_at?: string;
  }

  