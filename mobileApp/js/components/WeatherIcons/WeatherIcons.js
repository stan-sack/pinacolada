/**
 * WeatherIcons icon set component.
 * Usage: <WeatherIcons name="icon-name" size={20} color="#4F8EF7" />
 */

import createIconSet from 'react-native-vector-icons/lib/create-icon-set';
import glyphMap from '../../assets/font-config/WeatherIconsGlyphMap.json'

const iconSet = createIconSet(glyphMap, 'Weather Icons', 'WeatherIcons.ttf');

export default iconSet;

export const Button = iconSet.Button;
export const TabBarItem = iconSet.TabBarItem;
export const TabBarItemIOS = iconSet.TabBarItemIOS;
export const ToolbarAndroid = iconSet.ToolbarAndroid;
export const getImageSource = iconSet.getImageSource;
