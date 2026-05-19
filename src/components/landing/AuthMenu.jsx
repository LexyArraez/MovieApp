import { Button } from "../common/Button"
import { ArrowRight, LogIn } from 'lucide-react';

export const AuthMenu = () => {

  return (
    <div className="flex flex-col md:flex-row items-center gap-5 w-full md:w-auto ">

      <Button
        variant="primary"
        icon={ArrowRight}>
        Empezar ahora
      </Button>

      <div className="block md:hidden text-body-sm text-neutral-500 mt-2">
        ¿Ya tienes una cuenta?{' '}

      </div>

      <Button
        variant="text"
        icon={LogIn}>
        Iniciar sesión
      </Button>

    </div>
  )
}
