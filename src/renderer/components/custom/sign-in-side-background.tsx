import SideImageBackground from '../../../../assets/sign-in-side.jpg';

export const SignInSideBackground = () => {
  return (
    <div className="absolute inset-0 -z-10 bg-zinc-900 brightness-75">
      <img
        src={SideImageBackground}
        className="size-full object-cover"
        alt="Side Image GF Chaos"
      />
    </div>
  );
};
