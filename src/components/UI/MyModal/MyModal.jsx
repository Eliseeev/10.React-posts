import React from 'react'
import cl from './MyModal.module.css'

// пропс children необходим для помещения в данное модальное окно всё, что захотим
const MyModal = ({children, visible, setVisible}) => {

  const rootClasses = [cl.myModal]
    
    if(visible) {
      rootClasses.push(cl.active);
    }
  return (
    // Скрытие/Отображение модального окна
    //{[cl.myModal, cl.active].join(' ')} - способ добавления класса active
    <div className = {rootClasses.join(' ')} onClick = {() => setVisible(false)}>
      <div className = {cl.myModalContent} onClick = {e => e.stopPropagation()}>{children}</div>
    </div>
  )
}

export default MyModal