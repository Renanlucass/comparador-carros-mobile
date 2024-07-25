import { ReactNode } from 'react';
import { ImageSourcePropType } from 'react-native';

export interface Car {
    model: ReactNode;
    make: string;
    year: number;
    price: number;
    fuelConsumption: number;
    horsepower: number;
    acceleration: number;
    transmission: string;
    image: ImageSourcePropType;
}