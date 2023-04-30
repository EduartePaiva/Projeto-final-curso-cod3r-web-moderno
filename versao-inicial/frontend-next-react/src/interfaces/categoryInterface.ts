export default interface categoryInterface {
    id: number
    name: string
    parentId: number | null
    path: string,
    actions?: any
}