import React, { PureComponent } from 'react';
import './Button.css';
import './ButtonItems';
import { ButtonItems } from './ButtonItems';


class Button extends Comment {
    render() {
     return(
         <div>
             <ul className='Button-options'>
                 {ButtonItems.map ((item, index)=> {
                     return (
                         <li key={index} >
                             <a className={item.cname} href ={item.url}>
                                 {item.title}
                             </a>
                         </li>
                     )
                 })}
             </ul>
         </div>
     )
    }
}
export default Button;