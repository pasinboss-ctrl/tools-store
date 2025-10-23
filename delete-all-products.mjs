import { createClient } from '@sanity/client'

const client = createClient({
  projectId: '6g9o8ej4',      // 🔁 เปลี่ยนตรงนี้
  dataset: 'production',
  token: 'sklH8I96za3pwhijKKl7ir2vZur5pdeNSc5lcNhkoHoUZMuOdGnZUAXvq0UTjYir9kBmhwbkkHZwovhYto6foUHghbxh6rnh1XTk2Ata37T6UI9ftoZtUaEUGjqmGckmTw93Rnk4xjwFNy4HqXQ2E4of3dQYs6J1tuzgnWZbTOPoile0Wo7C',               // 🔁 ใส่ token ที่มีสิทธิ์ลบ
  apiVersion: '2023-10-01',
  useCdn: false,
})

async function deleteAllProducts() {
  const productIds = await client.fetch(`*[_type == "product"]._id`)
  console.log(`🧹 Found ${productIds.length} products.`)

  for (const id of productIds) {
    await client.delete(id)
    console.log(`✅ Deleted ${id}`)
  }

  console.log('🎉 All products deleted!')
}

deleteAllProducts().catch(console.error)

//sk4UucJlaVasoy36yHlBeXjQpSxU7791HNBYHvqh4XHOG9pJNdzOL8NO5w9bJyyI9tXiwM8ddDckANarFbYBXkWIarvzTmWk7E19yByrkUm7UC4Zv7xRMZhTnQOQMInaUvtkopJ7eqXNhvSoApDbpht1PLUG9FmApwNQPq7JxCEiAL5kYu9B
