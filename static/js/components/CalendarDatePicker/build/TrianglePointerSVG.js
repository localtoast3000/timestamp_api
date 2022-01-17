const defaultValues = {
  width: 44,
  height: 34,
  viewBox: '0 0 44 34',
};

export default function TrianglePointerSVG({ width, height, viewBox } = defaultValues) {
  return `
	<svg xmlns="http://www.w3.org/2000/svg" 
     width="${width}" 
     height="${height}" 
     viewBox="${viewBox}"
	 fill="none"
	 class="triangle-pointer-svg">
		<g filter="url(#filter0_d_4_2)">
			<path d="M2 33L22 3L42 33H32H2Z" fill="white"/>
		</g>
			<defs>
				<filter id="filter0_d_4_2" x="0" y="0" width="44" height="34" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
					<feFlood flood-opacity="0" result="BackgroundImageFix"/>
					<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
					<feOffset dy="-1"/>
					<feGaussianBlur stdDeviation="1"/>
					<feComposite in2="hardAlpha" operator="out"/>
					<feColorMatrix type="matrix" values="0 0 0 0 0.67451 0 0 0 0 0.666667 0 0 0 0 0.666667 0 0 0 0.33 0"/>
					<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_4_2"/>
					<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_4_2" result="shape"/>
				</filter>
			</defs>
	</svg>

	`;
}
