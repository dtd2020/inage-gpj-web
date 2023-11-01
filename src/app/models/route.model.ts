export interface RouteModel {

    path: string;
      title: string;
      collapse: string;
      type: string;
      icontype: string;
      children: RouteChild[];

}

export interface RouteChild {
    path: string;
    title: string;
    ab: string;
}