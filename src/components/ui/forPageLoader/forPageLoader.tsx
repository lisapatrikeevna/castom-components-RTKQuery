import s from './forPageLoader.module.scss'

const ForPageLoader = () => {
  return (<div id="page_preloader">
      <div className={s.cssload_container}>
        <div className={s.cssload_l}>L</div>
        <div className={s.cssload_circle}></div>
        <div className={s.cssload_square}></div>
        <div className={s.cssload_triangle}></div>
        <div className={s.cssload_i}>I</div>
        <div className={s.cssload_n}>N</div>
        <div className={s.cssload_g}>G</div>
      </div>
    </div>);
};

export default ForPageLoader;