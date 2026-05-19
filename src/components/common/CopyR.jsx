
export const CopyR = ({ company = "" }) => {

    const currentYear = new Date().getFullYear();

    return (
        <p className="text-body-sm text-neutral-0 select-none">
            © {currentYear} {company}. Todos los derechos reservados.
        </p>
    );
};

