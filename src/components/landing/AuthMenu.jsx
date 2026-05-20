import { Button } from "../common/Button"
import { ArrowRight, LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const AuthMenu = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row items-center gap-5 w-full md:w-auto ">

      <Button
        variant="primary"
        icon={ArrowRight}
        onClick={() => navigate('/home')}>
        Explorar ahora
      </Button>

      <div className="block md:hidden text-body-sm text-neutral-500 mt-2">
        ¿Ya tienes una cuenta?{' '}

      </div>

      <Button
      className="text-neutral-0"
        variant="text"
        icon={LogIn}>
        
        Iniciar sesión
      </Button>

    </div>
  )
}
