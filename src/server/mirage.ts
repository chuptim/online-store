import { createServer, Model } from 'miragejs';

export function makeServer() {
  return createServer({
    models: {
      product: Model,
      order: Model,
    },

    
    seeds(server) {
      const cheeses = [
        { name: 'Камамбер', description: 'Мягкий французский сыр с белой плесенью', price: 890 },
        { name: 'Бри', description: 'Нежный сыр с маслянистой текстурой', price: 950 },
        { name: 'Рокфор', description: 'Сыр с голубой плесенью, пикантный вкус', price: 1200 },
        { name: 'Пармезан', description: 'Твёрдый итальянский сыр для пасты', price: 1500 },
        { name: 'Маасдам', description: 'Сладковатый сыр с большими дырками', price: 780 },
        { name: 'Гауда', description: 'Голландский сыр с ореховым оттенком', price: 650 },
        { name: 'Чеддер', description: 'Английский сыр с насыщенным вкусом', price: 720 },
        { name: 'Моцарелла', description: 'Нежный итальянский сыр для салатов', price: 550 },
        { name: 'Фета', description: 'Греческий рассольный сыр', price: 600 },
        { name: 'Дор Блю', description: 'Сыр с голубой плесенью и острым вкусом', price: 1100 },
        { name: 'Эдам', description: 'Полутвёрдый сыр с ореховым привкусом', price: 680 },
        { name: 'Грюйер', description: 'Швейцарский сыр для фондю', price: 1350 },
        { name: 'Манчего', description: 'Испанский овечий сыр', price: 1420 },
        { name: 'Тильзитер', description: 'Острый сыр с мелкими дырочками', price: 790 },
        { name: 'Пекорино', description: 'Итальянский овечий сыр', price: 1300 },
        { name: 'Горгонзола', description: 'Итальянский сыр с голубой плесенью', price: 1150 },
        { name: 'Бофор', description: 'Французский сыр из коровьего молока', price: 1600 },
        { name: 'Конте', description: 'Французский прессованный сыр', price: 1480 },
        { name: 'Стилтон', description: 'Английский голубой сыр', price: 1250 },
        { name: 'Халлуми', description: 'Кипрский сыр для жарки', price: 900 },
      ];

      cheeses.forEach((cheese, idx) => {
        server.create('product', {
          id: String(idx + 1),
          name: cheese.name,
          description: cheese.description,
          price: cheese.price,
        });
      });
    },

    routes() {
      this.namespace = 'api';
      this.timing = 500;

      this.get('/products', (schema) => {
        return { products: schema.all('product').models.map((p) => p.attrs) };
      });

      this.post('/orders', (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        schema.create('order', attrs);
        return { success: true, message: 'Заказ оформлен' };
      });
    },
  });
}