import Client from "../database"

export class Order {
    // define table
    table: string = 'orders';

    async addProduct(quantity: number, orderId: string, productId: string): Promise<Order> {
        try {
            const sql = 'INSERT INTO order_products (qunatity, order_id, product_id) VALUES ($1, $2, $3)'

            //@ts-ignore
            const conn = await Client.connect()

            const result = await conn.query(sql, [quantity, orderId, productId])

            conn.release()

        }
        catch (err) {
            throw new Error(`Could not add product ${productId} to order ${orderId}: ${err}`)
        }
        
    }
  
}