import { DiAngularSimple } from "react-icons/di";
import { DiApple } from "react-icons/di";
import { DiAppstore } from "react-icons/di";
import { DiCss3 } from "react-icons/di";
import { DiNpm } from "react-icons/di";
import { DiProlog } from "react-icons/di";


export const featuredItems = [
    DiNpm,
    DiProlog,
    DiCss3,
    DiAppstore,
    DiApple,
    DiAngularSimple
]


export const addTwoClass = (class1: string, class2: string): string => {
    return `${class1} ${class2}`
}
  