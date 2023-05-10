export default interface articlePostInterface {
    id?: number
    name: string
    userId: number | null
    categoryId: number | null
    description: string
    imageUrl: string | null
    content?: string
}