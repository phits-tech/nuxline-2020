import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class SchedulePage extends Vue {
    @Prop() private msg!: string
}
