import Select from "react-select";
import useCities from "@/app/hooks/useCities";

export type CitySelectValue = {
  name: string;
  value: string;
  region: string;
  latlng: number[];
};

interface LocationSelectProps {
  value?: CitySelectValue,
  onChange: (value: CitySelectValue) => void;
}

const LocationSelect: React.FC<LocationSelectProps> = ({ value, onChange }) => {
  const { getCities } = useCities();

  return (
    <div>
      <Select
        placeholder="Sélectionnez une ville"
        isClearable
        value={value}
        options={getCities()}
        onChange={(value) => onChange(value as CitySelectValue)}
        formatOptionLabel={(option) => (
          <div className="flex items-center">
            <div className="text-ptgGrey">{option.name}</div>
            <div className="text-gray-400 text-sm mx-1">-</div>
            <span className="text-gray-400 text-sm">{option.region}</span>
          </div>
        )}
        classNames={{
          control: () => 'p-3 !border-2 !border-ptgGrey',
          input: () => 'text-lg',
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          borderColor: '#3B3B35',
          colors: {
            ...theme.colors,
            primary: '#78B7E1',
            primary25: '#eee7d4',
            neutral10: '#eee7d4',
          },
        })}
      />
    </div>
  );
};

export default LocationSelect;
