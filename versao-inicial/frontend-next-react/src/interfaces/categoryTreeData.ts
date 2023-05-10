export default interface categoryTreeData {
    id: number
    name: string
    parentId: number | null
    children: categoryTreeData[]
    hide?: boolean
}