import React from 'react';
import TweenOne from 'rc-tween-one';
import SvgDrawPlugin from 'rc-tween-one/lib/plugin/SvgDrawPlugin';
import BannerImg from '../assets/home/banner.svg'

TweenOne.plugins.push(SvgDrawPlugin);

export default function BannerImage() {
  return <img src={BannerImg} width={510} />;
}
