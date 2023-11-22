import HomeImageBackground from '../../../../assets/home-bg.jpg';

export const HomeBackground = () => {
  return (
    <div className="absolute inset-0 -z-10 bg-zinc-900">
      <img
        src={HomeImageBackground}
        className="h-full w-full object-cover blur-sm brightness-75"
        alt="Background Image GF Chaos"
      />
    </div>
  );
};
