uniform vec2 iResolution;
uniform float iTime;

float circle(vec2 uv, float r, vec2 p, float blur){
 float d = length(uv-p); // 向量的长度
 float c = smoothstep(r, r-blur, d); // d 在 r~r-blur进行平滑过渡
 return c;
}
void main()
{
    vec2 uv = gl_FragCoord.xy/iResolution.xy;
    vec3 col = 0.5 + 0.5*cos(iTime+uv.xyx+vec3(0,2,4));
    gl_FragColor = vec4(col,1.0);
}