import React from 'react';
import Svg, { Path, G, Circle, Rect, Polygon, Line, Ellipse } from 'react-native-svg';

// Reusable Google Icon
export const GoogleIcon = ({ size = 20 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <Path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <Path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22c-.22-.66-.35-1.36-.35-2.09z"
      fill="#FBBC05"
    />
    <Path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      fill="#EA4335"
    />
  </Svg>
);

// Learnify Logo Component
export const LearnifyLogo = ({ size = 80 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    {/* Blue soft circular gradient background shadow */}
    <Circle cx="50" cy="50" r="45" fill="#EBF3FF" opacity="0.6" />
    <Circle cx="50" cy="50" r="38" fill="#D3E6FF" opacity="0.8" />
    
    {/* Main Shield Base */}
    <Path
      d="M50 22 C62 22, 72 26, 75 30 C75 55, 62 75, 50 78 C38 78, 25 55, 25 30 C28 26, 38 22, 50 22 Z"
      fill="#2563EB"
    />
    
    {/* Graduation Cap Top */}
    <Polygon
      points="50,33 70,41 50,49 30,41"
      fill="#FFFFFF"
    />
    
    {/* Cap Base */}
    <Path
      d="M40 45.5 V49.5 C40 52.5, 60 52.5, 60 49.5 V45.5"
      fill="#FFFFFF"
      opacity="0.9"
    />
    
    {/* Tassel */}
    <Path
      d="M50 41 L65 47 V53"
      stroke="#FFFFFF"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
    />
    <Circle cx="65" cy="53" r="2" fill="#FFFFFF" />
  </Svg>
);

// Splash Screen Illustration: Boy sitting reading a book with backpack and bookshelf/plant items
export const SplashIllustration = ({ width = 300, height = 220 }: { width?: number; height?: number }) => (
  <Svg width={width} height={height} viewBox="0 0 300 220" fill="none">
    {/* Soft Background Oval Glow */}
    <Ellipse cx="150" cy="110" rx="110" ry="80" fill="#F4F8FF" opacity="0.9" />
    <Ellipse cx="150" cy="110" rx="90" ry="60" fill="#EAF2FF" opacity="0.7" />

    {/* Small background learning icons floated around */}
    <Path d="M40 40 H48 V48 H40 Z" fill="#D2E4FF" opacity="0.5" />
    <Path d="M260 80 L264 88 L256 88 Z" fill="#D2E4FF" opacity="0.6" />
    
    {/* Ground Ellipse */}
    <Ellipse cx="150" cy="175" rx="110" ry="12" fill="#E6EEFA" />

    {/* Backpack on the left */}
    <G id="backpack" transform="translate(45, 120)">
      {/* Main body */}
      <Path d="M10 45 C10 15, 40 15, 40 45 V55 H10 Z" fill="#1E3A8A" />
      {/* Front pocket */}
      <Path d="M13 38 C13 30, 37 30, 37 38 V55 H13 Z" fill="#2563EB" />
      {/* Zipper details */}
      <Rect x="23" y="32" width="4" height="2" fill="#FFFFFF" />
      {/* Bottom base */}
      <Path d="M10 50 H40 V56 H10 Z" fill="#172554" />
      {/* Straps */}
      <Path d="M8 25 C5 25, 5 45, 10 45" stroke="#1E3A8A" strokeWidth="3" fill="none" />
    </G>

    {/* Stack of books on the right */}
    <G id="books-right" transform="translate(205, 130)">
      {/* Bottom book */}
      <Rect x="5" y="36" width="55" height="10" rx="2" fill="#A7F3D0" />
      <Rect x="8" y="36" width="52" height="10" rx="1" fill="#34D399" />
      <Rect x="5" y="38" width="48" height="6" fill="#A7F3D0" />
      
      {/* Middle book */}
      <Rect x="10" y="27" width="50" height="9" rx="2" fill="#93C5FD" />
      <Rect x="13" y="27" width="47" height="9" rx="1" fill="#60A5FA" />
      <Rect x="10" y="29" width="43" height="5" fill="#93C5FD" />

      {/* Top book */}
      <Rect x="8" y="19" width="50" height="8" rx="2" fill="#BFDBFE" />
      <Rect x="11" y="19" width="47" height="8" rx="1" fill="#3B82F6" />
      <Rect x="8" y="21" width="44" height="4" fill="#BFDBFE" />

      {/* Flower Pot sitting on books */}
      <G id="flower-pot" transform="translate(18, -19)">
        {/* Pot */}
        <Path d="M12 25 L8 38 H22 L18 25 Z" fill="#B45309" />
        <Rect x="7" y="22" width="16" height="3" rx="1" fill="#D97706" />
        {/* Plant Leaves */}
        <Path d="M15 22 C15 10, 5 15, 5 15 C5 15, 12 22, 15 22 Z" fill="#059669" />
        <Path d="M15 22 C15 5, 25 10, 25 10 C25 10, 18 22, 15 22 Z" fill="#10B981" />
        <Path d="M15 22 C10 12, 12 5, 12 5 C12 5, 18 15, 15 22 Z" fill="#047857" />
        <Path d="M15 22 C20 12, 18 5, 18 5 C18 5, 14 15, 15 22 Z" fill="#34D399" />
      </G>
    </G>

    {/* Reading Boy in the center */}
    <G id="reading-boy" transform="translate(85, 90)">
      {/* Legs (sitting cross-legged) */}
      <Path d="M25 80 C10 80, 5 70, 15 65 C25 60, 45 70, 55 70 C65 70, 85 60, 95 65 C105 70, 100 80, 85 80 Z" fill="#1E293B" />
      
      {/* Shoes (white sneakers) */}
      <Ellipse cx="14" cy="72" rx="10" ry="6" fill="#F8FAFC" stroke="#E2E8F0" />
      <Ellipse cx="96" cy="72" rx="10" ry="6" fill="#F8FAFC" stroke="#E2E8F0" />
      
      {/* Body torso - Blue hoodie */}
      <Path d="M35 40 Q55 30 75 40 Q85 55 80 68 Q55 75 30 68 Q25 55 35 40 Z" fill="#3B82F6" />
      <Path d="M45 40 H65 V55 H45 Z" fill="#2563EB" opacity="0.3" />
      
      {/* Hoodie strings */}
      <Line x1="52" y1="36" x2="52" y2="52" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
      <Line x1="58" y1="36" x2="58" y2="52" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />

      {/* Head & Neck */}
      <Rect x="51" y="24" width="8" height="10" fill="#FFD2A1" rx="2" />
      <Circle cx="55" cy="18" r="12" fill="#FFD2A1" />
      
      {/* Hair (Black, stylized, modern spike) */}
      <Path d="M43 18 C43 10, 50 4, 60 4 C68 4, 68 12, 67 15 C65 10, 58 10, 56 12 C52 10, 47 15, 47 18 Z" fill="#1E293B" />
      <Path d="M67 12 C69 14, 69 19, 67 22 L65 18 Z" fill="#1E293B" />

      {/* Hands holding the tablet/book */}
      <Path d="M30 52 C35 52, 43 45, 47 48" stroke="#FFD2A1" strokeWidth="4" strokeLinecap="round" fill="none" />
      <Path d="M80 52 C75 52, 67 45, 63 48" stroke="#FFD2A1" strokeWidth="4" strokeLinecap="round" fill="none" />

      {/* Tablet/Book */}
      <G transform="rotate(-5, 55, 50)">
        <Rect x="42" y="44" width="26" height="18" rx="2" fill="#1E293B" />
        <Rect x="44" y="46" width="22" height="14" rx="1" fill="#FFFFFF" />
        <Line x1="55" y1="46" x2="55" y2="60" stroke="#E2E8F0" strokeWidth="1" />
      </G>
    </G>
  </Svg>
);

// Login Screen Illustration: Girl student holding books/notebooks
export const LoginIllustration = ({ width = 160, height = 160 }: { width?: number; height?: number }) => (
  <Svg width={width} height={height} viewBox="0 0 160 160" fill="none">
    {/* Light blue soft circle background */}
    <Circle cx="80" cy="80" r="70" fill="#F0F6FF" />
    <Circle cx="80" cy="80" r="55" fill="#E0EDFF" />
    
    {/* Grid points background element */}
    <G opacity="0.4" fill="#3B82F6">
      <Circle cx="40" cy="70" r="1.5" />
      <Circle cx="48" cy="70" r="1.5" />
      <Circle cx="56" cy="70" r="1.5" />
      <Circle cx="40" cy="78" r="1.5" />
      <Circle cx="48" cy="78" r="1.5" />
      <Circle cx="56" cy="78" r="1.5" />
      <Circle cx="40" cy="86" r="1.5" />
      <Circle cx="48" cy="86" r="1.5" />
      <Circle cx="56" cy="86" r="1.5" />
    </G>

    {/* Student Girl */}
    <G id="girl" transform="translate(30, 20)">
      {/* Backpack behind */}
      <Path d="M22 62 C15 62, 10 50, 14 38 C17 30, 30 30, 33 38 C37 50, 30 62, 22 62 Z" fill="#1E40AF" />
      <Path d="M12 40 C6 44, 4 60, 10 65" stroke="#2563EB" strokeWidth="3" fill="none" strokeLinecap="round" />

      {/* Body torso - white jacket over light blue top */}
      <Path d="M25 65 C20 75, 12 95, 10 115 H65 C60 95, 52 75, 47 65 Z" fill="#FFFFFF" />
      <Path d="M25 65 C22 75, 18 95, 16 115 H56 C54 95, 50 75, 47 65 Z" fill="#E5E7EB" opacity="0.5" />
      {/* Light blue top inner */}
      <Path d="M31 65 L36 82 L41 65 Z" fill="#60A5FA" />

      {/* Head & Neck */}
      <Rect x="32" y="52" width="8" height="15" fill="#FCD34D" opacity="0.8" />
      {/* Face */}
      <Circle cx="36" cy="45" r="13" fill="#FDBA74" />
      
      {/* Face features (Smiley eyes) */}
      <Path d="M30 44 Q32 46 34 44" stroke="#4B5563" strokeWidth="1.5" fill="none" />
      <Path d="M38 44 Q40 46 42 44" stroke="#4B5563" strokeWidth="1.5" fill="none" />
      <Path d="M34 50 Q36 53 38 50" stroke="#EF4444" strokeWidth="1" fill="none" />

      {/* Hair (Long dark hair with bangs) */}
      <Path d="M23 45 C23 32, 49 32, 49 45 C49 55, 48 70, 48 78 C42 75, 44 65, 44 60 C40 60, 38 65, 34 60 C30 65, 27 60, 24 75 C24 70, 23 55, 23 45 Z" fill="#1E293B" />
      {/* Front bangs */}
      <Path d="M25 38 C28 34, 34 35, 36 38 C38 35, 44 34, 47 38 C43 32, 29 32, 25 38 Z" fill="#0F172A" />

      {/* Arms holding files */}
      <Path d="M18 72 C22 78, 30 84, 38 84" stroke="#FDBA74" strokeWidth="4.5" strokeLinecap="round" fill="none" />
      
      {/* Files / Books */}
      <G transform="rotate(-15, 38, 80)">
        {/* Pink Folder */}
        <Rect x="26" y="68" width="28" height="20" rx="2" fill="#F472B6" />
        <Rect x="28" y="70" width="24" height="16" fill="#F472B6" opacity="0.5" />
        {/* Blue Folder on top */}
        <Rect x="29" y="72" width="27" height="18" rx="2" fill="#3B82F6" />
        <Line x1="33" y1="78" x2="51" y2="78" stroke="#FFFFFF" strokeWidth="1.5" />
        <Line x1="33" y1="82" x2="47" y2="82" stroke="#FFFFFF" strokeWidth="1.5" />
      </G>

      {/* Left hand holding files */}
      <Path d="M48 72 C46 76, 42 82, 38 84" stroke="#FDBA74" strokeWidth="4.5" strokeLinecap="round" fill="none" />
    </G>
  </Svg>
);

// Signup Screen Illustration: Stack of books with graduation cap on top
export const SignupIllustration = ({ width = 160, height = 150 }: { width?: number; height?: number }) => (
  <Svg width={width} height={height} viewBox="0 0 160 150" fill="none">
    {/* Soft blue glow backdrop */}
    <Circle cx="80" cy="75" r="55" fill="#F5F9FF" />
    <Circle cx="100" cy="70" r="45" fill="#E8F1FF" opacity="0.8" />

    {/* Stack of books */}
    <G id="books-stack" transform="translate(25, 60)">
      {/* Bottom Book (Greenish-Blue) */}
      <Path d="M10 40 H80 V54 H10 Z" fill="#0D9488" />
      <Path d="M8 40 H10 V54 H8 Z" fill="#14B8A6" />
      <Rect x="15" y="40" width="60" height="14" fill="#38BDF8" opacity="0.1" />
      <Rect x="78" y="42" width="4" height="10" fill="#F1F5F9" />

      {/* Middle Book (Orange/Red) */}
      <Path d="M13 26 H77 V38 H13 Z" fill="#E11D48" />
      <Path d="M10 26 H13 V38 H10 Z" fill="#FB7185" />
      <Rect x="75" y="28" width="4" height="8" fill="#F1F5F9" />

      {/* Top Book (Light Blue) */}
      <Path d="M8 12 H74 V24 H8 Z" fill="#2563EB" />
      <Path d="M5 12 H8 V24 H5 Z" fill="#60A5FA" />
      <Rect x="72" y="14" width="4" height="8" fill="#F1F5F9" />

      {/* Graduation Cap Sitting on Top Book */}
      <G id="mini-cap" transform="translate(18, -25)">
        <Polygon points="25,4 47,12 25,20 3,12" fill="#1E3A8A" />
        <Polygon points="25,6 43,12 25,18 7,12" fill="#2563EB" />
        <Path d="M12 16.5 V23 C12 28, 38 28, 38 23 V16.5" fill="#1E3A8A" />
        <Line x1="25" y1="12" x2="38" y2="18" stroke="#FBBF24" strokeWidth="1.5" />
        <Line x1="38" y1="18" x2="38" y2="28" stroke="#FBBF24" strokeWidth="1.5" />
        <Circle cx="38" cy="28" r="1.5" fill="#FBBF24" />
      </G>
    </G>

    {/* Small Plant next to books */}
    <G id="signup-plant" transform="translate(100, 78)">
      <Path d="M5 20 L3 32 H17 L15 20 Z" fill="#D97706" />
      <Rect x="2" y="17" width="16" height="3" rx="1" fill="#F59E0B" />
      <Path d="M9 17 C9 8, 2 12, 2 12 C2 12, 7 17, 9 17 Z" fill="#059669" />
      <Path d="M9 17 C9 4, 16 8, 16 8 C16 8, 11 17, 9 17 Z" fill="#10B981" />
    </G>
  </Svg>
);
