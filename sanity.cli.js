import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    // 💡 สำคัญ: ต้องใส่ Project ID ของคุณตรงนี้
    projectId: '6g9o8ej4',
    
    // 💡 สำคัญ: ต้องใส่ชื่อ Dataset เป้าหมาย (เช่น 'production')
    dataset: 'production'
  }
})