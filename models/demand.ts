interface IDemand {
  id?: string;
  customer: string;
  title: string;
  body?: Object;
  points?: Number;
  price?: Number;
  estimateInDays?: Number;
  priority?: Number;
  progress?: Number;
  status?: string;
  type?: string;
  estimated?: Boolean;
  billable?: Boolean;
  paid?: Boolean;
  approved?: Boolean;
  removed?: Boolean;
}

export default class Demand implements IDemand {
  id?: string;
  customer: string;
  title: string;
  body?: Object;
  points?: Number;
  price?: Number;
  estimateInDays?: Number;
  priority?: Number;
  progress?: Number;
  status?: string;
  type?: string;
  estimated?: Boolean;
  billable?: Boolean;
  paid?: Boolean;
  approved?: Boolean;
  removed?: Boolean;

  constructor({
    id,
    customer,
    title,
    body,
    points,
    price,
    estimateInDays,
    priority,
    progress,
    status,
    type,
    estimated,
    billable,
    paid,
    approved,
    removed,
  }: IDemand) {
    this.id = id;
    this.customer = customer;
    this.title = title;
    this.body = body;
    this.points = points;
    this.price = price;
    this.estimateInDays = estimateInDays;
    this.priority = priority;
    this.progress = progress;
    this.status = status;
    this.type = type;
    this.estimated = estimated;
    this.billable = billable;
    this.paid = paid;
    this.approved = approved;
    this.removed = removed;
  }

  static fromJson(json: any): Demand {
    return new Demand({
      id: json._id,
      customer: json.customer,
      title: json.title,
      body: json.body,
      points: json.points,
      price: json.price,
      estimateInDays: json.estimate_in_days,
      priority: json.priority,
      progress: json.progress,
      status: json.status,
      type: json.type,
      estimated: json.estimated,
      billable: json.billable,
      paid: json.paid,
      approved: json.approved,
      removed: json.removed,
    });
  }

  toJson(): any {
    return {
      _id: this.id,
      customer: this.customer,
      title: this.title,
      body: this.body,
      points: this.points,
      price: this.price,
      estimate_in_days: this.estimateInDays,
      priority: this.priority,
      progress: this.progress,
      status: this.status,
      type: this.type,
      estimated: this.estimated,
      billable: this.billable,
      paid: this.paid,
      approved: this.approved,
      removed: this.removed,
    };
  }

  static fromJsonArray(json: any[]): Demand[] {
    return json.map((item) => Demand.fromJson(item));
  }

  public static priorities = [
    { value: 1, title: "Alta", color: "error" },
    { value: 2, title: "Normal", color: "info" },    
  ];

  get priorityItem() {
    return Demand.priorities.find((p) => p.value === this.priority);
  }

  get priorityLabel() {
    const priority = this.priorityItem;
    return priority ? priority.title : "";
  }

  get priorityColor() {
    const priority = this.priorityItem;
    return priority ? priority.color : "";
  }

  public static statuses = [
    { title: "Na fila", value: "backlog" },
    { title: "Em andamento", value: "in-progress" },
    { title: "Finalizadas", value: "done" },
  ];

  get statusItem() {
    return Demand.statuses.find((status) => status.value === this.status);
  }

  get statusLabel() {
    const status = this.statusItem;
    return status ? status.title : "";
  }

  public static types = [
    { value: "feature", title: "Funcionalidade", icon: "mdi-star" },
    { value: "bug", title: "Correção", icon: "mdi-bug" },
    { value: "improvement", title: "Melhoria", icon: "mdi-wrench" },
  ];

  get typeItem() {
    return Demand.types.find((type) => type.value === this.type);
  }

  get typeIcon() {
    const t = this.typeItem;
    return t ? t.icon : "";
  }

  get typeLabel() {
    const t = this.typeItem;
    return t ? t.title : "";
  }
}
