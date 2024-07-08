import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const products = [
    {
      code: 'P001',
      name: 'MacBook Pro',
      description: 'Apple MacBook Pro 16-inch with M1 Pro chip',
      entryDate: '2024-06-26T14:30:00Z',
      expiryDate: '2024-06-30T14:30:00Z',
      stock: 10,
      price: 2499.0,
      imgUrl:
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-spacegray-select-202310?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1697230830200',
    },
    {
      code: 'P002',
      name: 'Samsung Galaxy S21',
      description: 'Samsung Galaxy S21 Ultra 5G',
      entryDate: '2024-06-26T14:30:00Z',
      expiryDate: '2024-06-30T14:30:00Z',
      stock: 20,
      price: 1199.0,
      imgUrl:
        'https://samsungbrshop.vtexassets.com/arquivos/ids/222466-600-auto?v=638315272752900000&width=600&height=auto&aspect=true',
    },
    {
      code: 'P003',
      name: 'Sony WH-1000XM4',
      description: 'Sony Noise Cancelling Headphones WH-1000XM4',
      entryDate: '2024-06-26T14:30:00Z',
      expiryDate: '2024-06-30T14:30:00Z',
      stock: 15,
      price: 349.99,
      imgUrl:
        'https://m.media-amazon.com/images/I/61cm-9ZjI0L.__AC_SX300_SY300_QL70_ML2_.jpg',
    },
    {
      code: 'P004',
      name: 'Apple Watch Series 7',
      description: 'Apple Watch Series 7 with GPS and Cellular',
      entryDate: '2024-06-26T14:30:00Z',
      expiryDate: '2024-06-30T14:30:00Z',
      stock: 30,
      price: 529.0,
      imgUrl: 'https://m.media-amazon.com/images/I/61RtB6hyiSL._AC_SX679_.jpg',
    },
    {
      code: 'P005',
      name: 'iPad Pro',
      description: 'Apple iPad Pro 12.9-inch with M1 chip',
      entryDate: '2024-06-26T14:30:00Z',
      expiryDate: '2024-06-30T14:30:00Z',
      stock: 12,
      price: 1099.0,
      imgUrl:
        'https://m.media-amazon.com/images/I/61NGnpjoRDL.__AC_SY445_SX342_QL70_ML2_.jpg',
    },
    {
      code: 'P006',
      name: 'Canon EOS R5',
      description: 'Canon EOS R5 Mirrorless Digital Camera',
      entryDate: '2024-06-26T14:30:00Z',
      expiryDate: '2024-06-30T14:30:00Z',
      stock: 8,
      price: 3899.0,
      imgUrl:
        'https://m.media-amazon.com/images/I/61R390jU45L.__AC_SY300_SX300_QL70_ML2_.jpg',
    },
    {
      code: 'P007',
      name: 'Bose SoundLink Revolve',
      description: 'Bose SoundLink Revolve+ Bluetooth Speaker',
      entryDate: '2024-06-26T14:30:00Z',
      expiryDate: '2024-06-30T14:30:00Z',
      stock: 25,
      price: 299.99,
      imgUrl:
        'https://m.media-amazon.com/images/I/71Qy-HGlgvL.__AC_SX300_SY300_QL70_ML2_.jpg',
    },
    {
      code: 'P008',
      name: 'PlayStation 5',
      description: 'Sony PlayStation 5 Console',
      entryDate: '2024-06-26T14:30:00Z',
      expiryDate: '2024-06-30T14:30:00Z',
      stock: 5,
      price: 499.99,
      imgUrl:
        'https://m.media-amazon.com/images/I/71FJOk3Zq4L.__AC_SY300_SX300_QL70_ML2_.jpg',
    },
    {
      code: 'P009',
      name: 'Dell UltraSharp Monitor',
      description: 'Dell UltraSharp 32 4K USB-C Monitor',
      entryDate: '2024-06-26T14:30:00Z',
      expiryDate: '2024-06-30T14:30:00Z',
      stock: 10,
      price: 899.99,
      imgUrl:
        'https://m.media-amazon.com/images/I/71inXyJwOcL.__AC_SX300_SY300_QL70_ML2_.jpg',
    },
    {
      code: 'P010',
      name: 'Logitech MX Keys',
      description: 'Logitech MX Keys Advanced Wireless Illuminated Keyboard',
      entryDate: '2024-06-26T14:30:00Z',
      expiryDate: '2024-06-30T14:30:00Z',
      stock: 18,
      price: 99.99,
      imgUrl:
        'https://m.media-amazon.com/images/I/71JFKFPi1VL.__AC_SX300_SY300_QL70_ML2_.jpg',
    },
  ]

  const users = [
    {
      name: 'admin',
      email: 'admin@admin.com',
      password: 'password123',
    },
    {
      name: 'Alice Johnson',
      email: 'alice.johnson@example.com',
      password: 'password123',
    },
    {
      name: 'Bob Smith',
      email: 'bob.smith@example.com',
      password: 'password123',
    },
    {
      name: 'Carol White',
      email: 'carol.white@example.com',
      password: 'password123',
    },
    {
      name: 'David Brown',
      email: 'david.brown@example.com',
      password: 'password123',
    },
    {
      name: 'Eve Davis',
      email: 'eve.davis@example.com',
      password: 'password123',
    },
    {
      name: 'Frank Miller',
      email: 'frank.miller@example.com',
      password: 'password123',
    },
    {
      name: 'Grace Wilson',
      email: 'grace.wilson@example.com',
      password: 'password123',
    },
    {
      name: 'Hank Moore',
      email: 'hank.moore@example.com',
      password: 'password123',
    },
    {
      name: 'Ivy Taylor',
      email: 'ivy.taylor@example.com',
      password: 'password123',
    },
    {
      name: 'Jack Anderson',
      email: 'jack.anderson@example.com',
      password: 'password123',
    },
  ]

  for (const user of users) {
    await prisma.user.create({
      data: {
        ...user,
        password: await hash(user.password, 8),
      },
    })
  }

  for (const product of products) {
    await prisma.product.create({ data: product })
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
