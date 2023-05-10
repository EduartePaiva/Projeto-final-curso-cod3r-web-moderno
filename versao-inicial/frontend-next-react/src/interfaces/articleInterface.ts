export default interface articleInterface {
    id?: number
    name: string
    description: string
    imageUrl: string | null
    content: string
    userId: number
    categoryId: number
}