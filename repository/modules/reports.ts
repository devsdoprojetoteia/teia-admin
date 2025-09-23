import HttpFactory from "../factory";


// Types
export interface ReportData {
  user: {
    id: string;
    name: string;
  };
  course: {
    id: string;
    name: string;
  };
  module: {
    id: string;
    name: string;
  };
  completed: boolean;
}

export interface FilterOptions {
  courses:
  Array<{
    id: string;
    name: string;
  }>;
  users: Array<{
    id: string;
    name: string;
  }>;
}

export interface ProgressFilters {
  courseId?: string;
  userId?: string;
}

class ReportsModule extends HttpFactory {
  async progress(filters: ProgressFilters): Promise<ReportData[]> {
    console.log(filters);
    const params = [];
    if (filters.courseId) {
      params.push(`courseId=${filters.courseId}`);
    }
    if (filters.userId) {
      params.push(`userId=${filters.userId}`);
    }

    let url = `/api/reports/progress`;

    if (params.length > 0) {
      url += `?${params.join("&")}`;
    }

    const json = await this.apiGet<any[]>(url);
    return json as ReportData[];
  }
  async progressFilters(): Promise<FilterOptions> {
    const json = await this.apiGet<any>(`/api/reports/progress-filters`);
    return json as FilterOptions;
  }
}

export default ReportsModule;
