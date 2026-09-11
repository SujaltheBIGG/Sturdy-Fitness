import { ButtonGroup, ButtonGroupItem } from '@sturdy/web'

// Suelto no tiene los bordes compartidos que lo definen: va dentro de ButtonGroup.
export const EnUnGrupo = () => (
  <ButtonGroup>
    <ButtonGroupItem>Semana</ButtonGroupItem>
    <ButtonGroupItem>Mes</ButtonGroupItem>
    <ButtonGroupItem>Año</ButtonGroupItem>
  </ButtonGroup>
)
