export const defaultValues = {
  width: 146,
  height: 80,
  viewBox: '20 4 136 70',
};

export default function LogoSVG({ width, height, viewBox } = defaultValues) {
  return `<?xml version="1.0" standalone="no"?>
    <!DOCTYPE svg>
    <svg xmlns="http://www.w3.org/2000/svg"
         width="${width}" 
         height="${height}" 
         viewBox="${viewBox}" 
         class="logo-svg">
            <path class="stampit-text" d="M29.8668 51.42C29.0168 51.42 28.1418 51.335 27.2418 51.165C26.3418 51.005 25.5068 50.81 24.7368 50.58C23.9668 50.34 23.3568 50.11 22.9068 49.89L23.3568 45.81C24.0568 46.15 24.7868 46.465 25.5468 46.755C26.3068 47.045 27.0868 47.28 27.8868 47.46C28.6868 47.64 29.4968 47.73 30.3168 47.73C31.3368 47.73 32.1568 47.53 32.7768 47.13C33.3968 46.73 33.7068 46.12 33.7068 45.3C33.7068 44.67 33.5318 44.165 33.1818 43.785C32.8318 43.395 32.2968 43.05 31.5768 42.75C30.8568 42.44 29.9368 42.09 28.8168 41.7C27.6968 41.31 26.6918 40.87 25.8018 40.38C24.9118 39.88 24.2068 39.25 23.6868 38.49C23.1668 37.73 22.9068 36.76 22.9068 35.58C22.9068 34.42 23.1918 33.39 23.7618 32.49C24.3318 31.58 25.1818 30.87 26.3118 30.36C27.4518 29.84 28.8668 29.58 30.5568 29.58C31.8368 29.58 33.0568 29.725 34.2168 30.015C35.3768 30.295 36.3668 30.6 37.1868 30.93L36.7968 34.86C35.6168 34.33 34.5068 33.93 33.4668 33.66C32.4368 33.38 31.3868 33.24 30.3168 33.24C29.1968 33.24 28.3318 33.425 27.7218 33.795C27.1118 34.165 26.8068 34.72 26.8068 35.46C26.8068 36.05 26.9768 36.525 27.3168 36.885C27.6568 37.245 28.1418 37.555 28.7718 37.815C29.4018 38.065 30.1568 38.33 31.0368 38.61C32.5568 39.09 33.8318 39.62 34.8618 40.2C35.9018 40.77 36.6818 41.465 37.2018 42.285C37.7318 43.095 37.9968 44.1 37.9968 45.3C37.9968 45.9 37.9018 46.555 37.7118 47.265C37.5218 47.965 37.1468 48.63 36.5868 49.26C36.0268 49.89 35.2068 50.41 34.1268 50.82C33.0568 51.22 31.6368 51.42 29.8668 51.42ZM45.1476 51.3C44.2076 51.3 43.4426 51.11 42.8526 50.73C42.2626 50.34 41.8276 49.845 41.5476 49.245C41.2676 48.645 41.1276 48.02 41.1276 47.37V39.06H38.9976L39.3276 36H41.1276V32.7L44.8476 32.31V36H48.1476V39.06H44.8476V45.84C44.8476 46.6 44.8926 47.15 44.9826 47.49C45.0726 47.82 45.2776 48.03 45.5976 48.12C45.9176 48.2 46.4276 48.24 47.1276 48.24H48.1476L47.8176 51.3H45.1476ZM53.8101 51.3C53.0101 51.3 52.2801 51.125 51.6201 50.775C50.9601 50.415 50.4351 49.9 50.0451 49.23C49.6551 48.56 49.4601 47.75 49.4601 46.8C49.4601 45.95 49.6551 45.225 50.0451 44.625C50.4451 44.015 50.9651 43.51 51.6051 43.11C52.2551 42.7 52.9551 42.38 53.7051 42.15C54.4651 41.91 55.2101 41.735 55.9401 41.625C56.6801 41.515 57.3301 41.45 57.8901 41.43C57.8501 40.57 57.6301 39.945 57.2301 39.555C56.8301 39.165 56.1501 38.97 55.1901 38.97C54.5201 38.97 53.8651 39.065 53.2251 39.255C52.5951 39.435 51.8801 39.72 51.0801 40.11L50.7501 37.08C51.6501 36.64 52.5501 36.31 53.4501 36.09C54.3601 35.87 55.2801 35.76 56.2101 35.76C57.3301 35.76 58.2951 35.96 59.1051 36.36C59.9151 36.76 60.5401 37.405 60.9801 38.295C61.4201 39.175 61.6401 40.34 61.6401 41.79V45.84C61.6401 46.59 61.6751 47.135 61.7451 47.475C61.8151 47.805 61.9451 48.015 62.1351 48.105C62.3251 48.195 62.6001 48.24 62.9601 48.24H63.4401L63.1101 51.3H61.7601C61.2001 51.3 60.7001 51.225 60.2601 51.075C59.8301 50.935 59.4601 50.735 59.1501 50.475C58.8401 50.215 58.5901 49.91 58.4001 49.56C57.9101 50.11 57.2451 50.54 56.4051 50.85C55.5751 51.15 54.7101 51.3 53.8101 51.3ZM55.3701 48.45C55.7001 48.45 56.1101 48.365 56.6001 48.195C57.0901 48.015 57.5301 47.74 57.9201 47.37V43.95C57.2201 43.98 56.5201 44.095 55.8201 44.295C55.1201 44.495 54.5351 44.79 54.0651 45.18C53.5951 45.57 53.3601 46.06 53.3601 46.65C53.3601 47.26 53.5201 47.715 53.8401 48.015C54.1601 48.305 54.6701 48.45 55.3701 48.45ZM65.5115 51V36H68.6915L68.9315 38.19L68.3915 37.53C68.9615 37.08 69.6415 36.675 70.4315 36.315C71.2315 35.945 72.1615 35.76 73.2215 35.76C74.0215 35.76 74.7265 35.88 75.3365 36.12C75.9565 36.35 76.4865 36.685 76.9265 37.125C77.3665 37.555 77.7215 38.07 77.9915 38.67L77.0915 38.46C77.5715 37.6 78.2715 36.935 79.1915 36.465C80.1215 35.995 81.1715 35.76 82.3415 35.76C83.7215 35.76 84.8465 36.045 85.7165 36.615C86.5865 37.185 87.2265 37.99 87.6365 39.03C88.0465 40.06 88.2515 41.27 88.2515 42.66V51H84.5315V42.93C84.5315 41.53 84.3115 40.495 83.8715 39.825C83.4415 39.155 82.7215 38.82 81.7115 38.82C81.2115 38.82 80.7715 38.91 80.3915 39.09C80.0215 39.26 79.7115 39.515 79.4615 39.855C79.2215 40.185 79.0415 40.59 78.9215 41.07C78.8015 41.54 78.7415 42.07 78.7415 42.66V51H75.0215V42.93C75.0215 42 74.9215 41.23 74.7215 40.62C74.5315 40.01 74.2215 39.56 73.7915 39.27C73.3715 38.97 72.8215 38.82 72.1415 38.82C71.2715 38.82 70.5565 39.025 69.9965 39.435C69.4465 39.835 68.9615 40.38 68.5415 41.07L69.2315 39.06V51H65.5115ZM91.5857 58.26V36H94.5857L95.3057 38.49L94.1957 38.1C94.8857 37.39 95.6357 36.825 96.4457 36.405C97.2557 35.975 98.2457 35.76 99.4157 35.76C100.886 35.76 102.121 36.115 103.121 36.825C104.121 37.535 104.876 38.48 105.386 39.66C105.906 40.84 106.166 42.13 106.166 43.53C106.166 44.93 105.906 46.22 105.386 47.4C104.876 48.58 104.121 49.525 103.121 50.235C102.121 50.945 100.886 51.3 99.4157 51.3C98.2457 51.3 97.2957 51.14 96.5657 50.82C95.8357 50.5 95.0957 49.99 94.3457 49.29L95.3057 48.54V58.26H91.5857ZM98.8457 48.24C99.9557 48.24 100.816 47.805 101.426 46.935C102.046 46.055 102.356 44.92 102.356 43.53C102.356 42.13 102.046 40.995 101.426 40.125C100.816 39.255 99.9557 38.82 98.8457 38.82C97.9857 38.82 97.2807 39.02 96.7307 39.42C96.1807 39.82 95.7757 40.375 95.5157 41.085C95.2557 41.785 95.1257 42.6 95.1257 43.53C95.1257 44.46 95.2557 45.28 95.5157 45.99C95.7757 46.69 96.1807 47.24 96.7307 47.64C97.2807 48.04 97.9857 48.24 98.8457 48.24ZM108.754 51V36H112.474V51H108.754ZM108.754 33.72V30H112.474V33.72H108.754ZM120.851 51.3C119.911 51.3 119.146 51.11 118.556 50.73C117.966 50.34 117.531 49.845 117.251 49.245C116.971 48.645 116.831 48.02 116.831 47.37V39.06H114.701L115.031 36H116.831V32.7L120.551 32.31V36H123.851V39.06H120.551V45.84C120.551 46.6 120.596 47.15 120.686 47.49C120.776 47.82 120.981 48.03 121.301 48.12C121.621 48.2 122.131 48.24 122.831 48.24H123.851L123.521 51.3H120.851Z"/>
            <g class="stamp-icon">
                <path class="stamp-vector-1" d="M136.579 11.9219C134.819 11.0054 132.791 11.1154 131.387 12.208C130.949 12.546 130.364 13.3264 130.179 13.8293C129.887 14.6039 129.826 15.3229 129.984 16.2385C130.096 16.9173 130.034 17.5641 129.78 18.2688C129.598 18.7839 128.981 19.6492 128.578 19.9554C128.294 20.1674 127.623 20.5236 127.355 20.5989L127.202 20.6432L129.892 22.5604L132.581 24.4775L132.574 24.3244C132.557 24.0406 132.669 23.2912 132.78 22.9561C132.943 22.4682 133.56 21.6028 133.985 21.2662C134.582 20.7858 135.151 20.5313 135.878 20.4045C136.692 20.2686 137.379 19.9702 137.982 19.4987C138.245 19.2921 138.343 19.1782 138.675 18.7133C139.007 18.2388 139.078 18.1152 139.19 17.7707C139.728 16.1886 139.279 14.384 138.012 13.0202C137.73 12.7172 136.94 12.113 136.579 11.9219Z"/>
                <path class="stamp-vector-2" d="M122.776 19.11C122.166 18.829 121.542 18.722 120.874 18.783C119.889 18.8741 119.208 19.2848 118.587 20.1569C118.224 20.666 118.18 20.8495 118.349 21.1393C118.45 21.3138 118.508 21.3548 126.626 27.1417C134.744 32.9286 134.801 32.9696 134.999 33.0084C135.328 33.0742 135.487 32.9727 135.85 32.4636C136.332 31.7883 136.511 31.261 136.496 30.5438C136.481 29.679 136.105 28.8115 135.449 28.1398C135.219 27.9035 134.533 27.4045 129.137 23.5627C123.909 19.8413 123.037 19.23 122.776 19.11Z"/>
                <path class="stamp-vector-3" d="M118.02 23.3868C117.555 24.0383 117.516 24.1743 117.683 24.4926L117.783 24.6767L124.808 29.6841C131.774 34.6506 131.836 34.6943 132.034 34.7331C132.383 34.803 132.513 34.7109 132.982 34.0526L133.381 33.4927L125.9 28.1598L118.419 22.8268L118.02 23.3868Z"/>
            </g>
    </svg>`;
}
