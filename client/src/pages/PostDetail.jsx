import React from 'react'
import PostAuthor from '../components/PostAuthor'
import { Link } from 'react-router-dom'
import Thumbnail from '../images/blog22.jpg'

const PostDetail = () => {
  return (
    <section className="post_detail">
      <div className="container post-detail__container">
        <div className="post-detail__header">
          <PostAuthor></PostAuthor>
          <div className="post-detail__buttons">
            <Link to={`/posts/werwer/edit`} className="btn sm primary">Edit</Link>
            <Link to={`/posts/werwer/delete`} className="btn sm danger">Delete</Link>
          </div>
        </div>
        <h1>This is the post title!</h1>
        <div className="post-detail__thumbnail">
          <img src={Thumbnail} alt="" />
        </div>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum at, laudantium voluptatem voluptates dolorem corporis accusamus sequi dicta velit debitis illo accusantium quaerat, hic ab quis vero facilis, odit fuga assumenda iusto pariatur nostrum deserunt! Nostrum sed, magnam veritatis ratione at eveniet odio cumque nesciunt, accusamus, corrupti reiciendis dolorum quam? Culpa omnis consequuntur delectus obcaecati cum temporibus architecto, ipsam nam quibusdam impedit qui amet harum reiciendis consequatur est soluta in, minus velit quis error quia nulla. Veritatis delectus animi quibusdam! Praesentium ad velit consequatur eaque. Nobis quasi asperiores, in aut saepe labore fuga error ipsa est? Recusandae, soluta sit voluptatum minus eos magni laborum tempore expedita libero accusantium veniam in veritatis doloribus sunt ea officia nihil dicta consequatur explicabo ratione vero dolorem facere at! Iste consequatur temporibus ad aliquam exercitationem cupiditate tempore. Culpa dolorem quia temporibus harum tempora nemo. Reiciendis voluptas nostrum non? Provident, tempora! Tempore hic delectus ex quo suscipit eum cumque, fugit beatae numquam doloribus facilis harum dolorem ea. Consectetur corporis, saepe aliquid aperiam debitis necessitatibus nam voluptatum, obcaecati repellendus veritatis autem quia adipisci fuga illo optio? Perferendis sunt dolorum dicta doloribus repellat alias beatae quas aliquid, explicabo, similique totam odio dolorem nam, sit quaerat! Consequuntur porro repudiandae quis, quaerat repellendus, voluptate incidunt nisi consequatur dicta deserunt cum fugit distinctio? Nulla quia, culpa ea inventore totam modi eum impedit est iure, harum dolores dolor a recusandae hic architecto nihil temporibus minus. Cumque aliquid dignissimos, a consequatur placeat at corporis ea necessitatibus. Quasi ipsum, placeat quo modi, libero eius explicabo amet velit aliquid minus expedita corporis! Illum explicabo dolorem fugit! Commodi sunt magnam ullam voluptas, sequi quos soluta, neque delectus nemo, cumque ut. Corporis dolores praesentium fugiat error eaque voluptates voluptatibus soluta enim eos ratione saepe repellendus ut est placeat labore vero, ipsum autem blanditiis iusto! Similique nobis adipisci cum eveniet repudiandae quia in doloremque architecto commodi labore repellendus tenetur odio ad exercitationem distinctio delectus libero quod, earum aspernatur! Beatae modi maxime, magni accusamus architecto ducimus repellendus voluptatum. Dolore, porro natus doloremque omnis assumenda corrupti praesentium, ipsa dignissimos aspernatur odio, possimus quam perspiciatis accusantium laudantium voluptatibus laboriosam. Mollitia quas ea modi saepe, et dicta animi consequatur eaque laboriosam aperiam consectetur quam sint omnis? Magni nemo expedita soluta eaque magnam a tenetur similique libero reprehenderit molestiae dicta laudantium aliquam commodi, repellat ipsa error, minus non, inventore quo deleniti. Numquam a corrupti minima itaque maxime. Quis blanditiis modi nobis pariatur beatae!</p>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias maxime nobis quidem, magnam, debitis dolor officia magni, minus quisquam ut commodi nemo blanditiis similique adipisci. Veritatis quam repellat non, consectetur sunt omnis soluta iste culpa dicta architecto voluptates obcaecati harum, cupiditate tenetur error ipsa quisquam. Laborum voluptatum tempore optio ratione eaque eius nostrum deserunt ea?</p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorem tempora culpa dolores reiciendis optio vitae similique placeat, accusantium neque nihil natus voluptas repudiandae autem consequuntur maxime architecto! Rem animi nihil ea quasi ipsam commodi nam consectetur quaerat hic placeat, neque quam natus eveniet vitae reiciendis fugit ut laborum voluptas, voluptate error perspiciatis. Quos aliquam a omnis vero laborum ad aliquid, non ipsa id dolorem corrupti iure ipsum officia! Sapiente sed dolores adipisci sunt eligendi dolorum, officia officiis nisi aliquam libero est similique earum, doloremque quas. Nulla inventore sit veritatis quas ut voluptates repudiandae eveniet fuga maxime, aperiam voluptate distinctio, vitae repellat natus libero voluptatem aspernatur atque qui possimus reiciendis. Eum, modi.
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis distinctio est, velit iusto ipsa veniam nostrum accusamus perspiciatis quia cumque quidem sit!</p>
      </div>
    </section>
  )
}

export default PostDetail