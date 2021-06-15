import React from 'react';
interface propsType{
    name: string
}
const Header = (props: propsType) => {
    return <h1>{props.name}</h1>;
}
export default Header