import HomeImageBackground from '../../../../assets/home-bg.gif';

export const HomeBackground = () => {
  return (
    <div className="absolute inset-0 -z-10 h-[100vh] w-full bg-zinc-900">
      <img
        src={HomeImageBackground}
        className="size-full object-cover brightness-50"
        alt="Background Image GF Chaos"
      />
    </div>
  );
};
