import React, {useEffect, useState} from "react"
import { Responsive, WidthProvider } from "react-grid-layout";
import { ButtonGroup } from "react-bootstrap";
import axios from "axios";
import {FetchError, FetchLoading} from "../others/FetchComponents";
import useDataApi from "../../helpers/useDataApi";
import SmallButton from "../buttons/SmallButton";
import NewModal from "../modules/modals/NewModal";
import {ToolBox} from "../others/Toolbox";
import {createGridBox} from "../others/Gridbox";

const GridLayout = WidthProvider(Responsive);

const TestPage = ({id='6033bbe31cbae847806d310d'}) => {

  
}

export default TestPage