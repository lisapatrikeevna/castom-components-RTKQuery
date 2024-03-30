import cl from './banersBlock.module.scss';
import { useState } from "react";
import image from './sliderImg.png';

const itemsValue = [
  { title: 'title banner', text: 'text banner', link: '', img: image },
  { title: 'Автопарк сервиса содержит', text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atqu consectetur adipisicing elit. Atque, rem', link: '', img: image },
  { title: 'title 2', text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque, rem?', link: '', img: image }
];

const BanersBlock = () => {
  const [num, setNum] = useState(1);

  const onChangeNum = (i) => {
    setNum(i);
  };

  return (
    <div className={cl.banner}>
      <div className={cl.container}>
        <h3 className={cl.bannerName}>
          Сервис Газелькин это <span>Большой ассортимент</span>
        </h3>
        <div className={cl.wrap}>
          {itemsValue.map((item, index) => (
            <div
              key={index}
              className={`${cl.item} ${num === index ? cl.active : ""}`}
            >
              <div className={cl.col6}>
                <div className={cl.textBlock}>
                  <h2 className={cl.title}>{item.title}</h2>
                  <p className={cl.text}>{item.text}</p>
                </div>
                <a href={item.link} className={cl.btn}>
                  Заказать услугу
                </a>
              </div>
              <div className={cl.col6}>
                <img src={item.img} alt={item.title} className={cl.img}/>
              </div>
            </div>
          ))}
        </div>
        <div className={cl.indicatorList}>
          {itemsValue.map((item, index) => (
            <span
              key={index}
              onClick={() => onChangeNum(index)}
              className={`${cl.carouselIndicator} ${num === index ? cl.active : ""}`}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BanersBlock;