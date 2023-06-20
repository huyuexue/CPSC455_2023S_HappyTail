import React from 'react';
import { Button } from "@mui/material";
import '../../style/button.css';
import {Link} from "react-router-dom";

export default function MuiButton(props) {
  const { variant, color, children, link, imageSrc } = props;

  function onClick(){
      
  }

  return (
    <Link to={link}>
      <Button variant={variant} color={color}>
        <img className = 'button-image' src={imageSrc} alt="Button Image" />
        {children}
      </Button>
    </Link>
  );
}


