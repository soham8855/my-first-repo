
import React from 'react';
import { Globe } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useLanguage } from '@/context/LanguageContext';

const LanguageSelector: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <Globe className="h-4 w-4 text-amber-600" />
      <Select
        value={language}
        onValueChange={(value) => setLanguage(value as 'english' | 'hindi' | 'marathi')}
      >
        <SelectTrigger className="w-[110px] bg-amber-50 border-amber-200 text-amber-800">
          <SelectValue placeholder={t("select_language")} />
        </SelectTrigger>
        <SelectContent className="bg-amber-50 border-amber-200">
          <SelectItem value="english" className="text-amber-800">English</SelectItem>
          <SelectItem value="hindi" className="text-amber-800">हिंदी</SelectItem>
          <SelectItem value="marathi" className="text-amber-800">मराठी</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default LanguageSelector;
