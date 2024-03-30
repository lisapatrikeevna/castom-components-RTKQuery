import './ImageLinkBlock.scss'
import serv1 from './assets/servlist1.png'
import serv2 from './assets/serv2.png'
import serv3 from './assets/serv3.png'
import serv4 from './assets/serv4.png'
import serv5 from './assets/serv5.png'


const itemsList1 = [{
  "id": "qwe1", "title": "Выгодный переезд со скидкой 25%", "text": "Дневные часы с 16:00 до 20:00", "link": "", "img": serv1
}, {
  "id": "qwe2", "title": "Скидка 30% на предварительный заказ", "text": "Планируйте переезд заранее и экономьте", "link": "", "img": serv2
}]
const itemsList2 = [{
  "id": "qwe3", "title": "Доставка от магазина до дома за 540 Р", "text": "Дневные часы с 16:00 до 20:00", "link": "", "img": serv3
}, {
  "id": "qwe4", "title": "Бесплатная оценка вашего переезда", "text": "Дневные часы с 16:00 до 20:00", "link": "", "img": serv4
}, {
  "id": "qwe5", "title": "Онлайн оплата - комфортно, быстро, бесопасно", "text": "Дневные часы с 16:00 до 20:00", "link": "", "img": serv5
}]

export default function ImageLinkBlock() {
  // const {itemsList1, itemsList2} = attributes;


  return (<div className="container bg">
    <div className="row">
      {itemsList1.map(item => {
        return (<div className="col-sm-6">
          <div className="pos-rel">
            <a key={item.id} href={item.link} className="wrapp-img__link">
              <span className="wrapp-img__link_deck">
                <h3 className="wrapp-img__link_title">{item.title}</h3>
                <p className="wrapp-img__link_text">{item.text}</p>
              </span>
              <div className='image'><img src={item.img}/></div>
            </a>
          </div>
        </div>)
      })}
    </div>
    <div className="row" style={{margin: '0 0 60px', position: 'relative', minHeight: '300px'}}>
      {itemsList2.map(item => {
        return <div className="col-sm-4">
          <div class="pos-rel">

            <a key={item.id} href={item.link} className="wrapp-img__link">
              <span className="wrapp-img__link_deck">
                <h3 className="wrapp-img__link_title">{item.title}</h3>
                <p className="wrapp-img__link_text">{item.text}</p>
              </span>
              <img src={item.img}/>
            </a>

          </div>
        </div>
      })}
    </div>
  </div>);
}
