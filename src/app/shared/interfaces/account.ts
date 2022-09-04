export interface IAction {
    page: number,
    movie: number
}
export interface IActions {
    last: IAction,
    next: IAction
}