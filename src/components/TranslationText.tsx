import { KeyPrefix, Namespace } from 'i18next';
import { ElementType } from 'react';
import { useTranslation } from 'react-i18next';
interface TranslationTextProps extends React.HTMLAttributes<HTMLElement> {
    i18nKey: TemplateStringsArray | TemplateStringsArray[] | string | string[];
    prefix?: KeyPrefix<Namespace>;
    namespace?: Namespace;
    as?: ElementType;
}

const TranslationText = ({
    i18nKey,
    prefix = '',
    namespace = 'common',
    as: Component = 'p',
    className,
}: TranslationTextProps) => {
    const { t } = useTranslation(namespace, { keyPrefix: prefix });
    return <Component className={className}>{t(i18nKey)}</Component>;
};

export { TranslationText };
