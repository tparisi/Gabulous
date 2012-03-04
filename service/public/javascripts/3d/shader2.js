varying vec3 vViewPosition;
varying vec3 vNormal;
varying vec2 vUv;
uniform vec4 offsetRepeat;

void main() {
	vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
	vUv = uv;

	vViewPosition = -mvPosition.xyz;
	vNormal = normalMatrix * normal;

	gl_Position = projectionMatrix * mvPosition;
} 