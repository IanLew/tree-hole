import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'

Vue.component('svg-icon', SvgIcon)

const create = ctx => ctx.keys().map(ctx)
create(require.context('./svg', false, /\.svg$/))
