import React from 'react'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'

// following dmt0's example

// just some cosmetics
const prettyInt = (x) =>
  x.toFixed(1)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')

// change these to whatever curve function you need!
export const sliderCurve = Math.exp
export const inverseCurve = Math.log
const makeMarks = (a) =>
  a.reduce((acc, cur) => {
    acc[inverseCurve(cur)] = prettyInt(cur)
    return acc
  }, {})

const LogSlider = ({ min, max, marks, stepsInRange, onChange }) => (
  <Slider
    min={inverseCurve(min)}
    max={inverseCurve(max)}
    marks={makeMarks(marks)}
    step={(inverseCurve(max) - inverseCurve(min)) / stepsInRange}
    tipFormatter={(value) => prettyInt(sliderCurve(value))}
    onChange={onChange}
  />
)

export default LogSlider
