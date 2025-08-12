'use client';

import React from 'react';

import { CometStickerRelay } from './CometStickerRelay';

export const CometStickerRelayExample = () => {
  return (
    <CometStickerRelay
      animationTriggers={{ hover: true, load: false }}
      sticker={{
        frame_count: 13,
        frame_rate: 83,
        frames_per_column: 4,
        frames_per_row: 4,
        label: 'Love, one dog squeezing another',
        pack: {
          name: 'Chummy Chum Chums',
        },
        sprite_image: {
          uri: 'https://scontent.fhan3-1.fna.fbcdn.net/v/t39.1997-6/14050179_1775283426045695_173111488_n.png?stp=dst-png_p280x280&_nc_cat=1&ccb=1-7&_nc_sid=ba09c1&_nc_ohc=EX-nAlS0gdUQ7kNvwHYe56m&_nc_oc=AdnNitvh0Gmle0X99yQROuo7k75rYOo6WpdTpMuZ8-pXFjS17gab516N_TJQ0dJre5Q&_nc_zt=26&_nc_ht=scontent.fhan3-1.fna&_nc_gid=OKtRkT8_Qgjikm6wGNwfLA&oh=00_AfU_kjIUMvr6lVKzSe_a4OAZwWdriPgTK6aAVb5xk6gYEw&oe=68A0A6E6',
        },
        image: {
          uri: 'https://scontent.fhan3-1.fna.fbcdn.net/v/t39.1997-6/14146878_1775283429379028_1512662151_n.png?stp=cp0_dst-png_s75x225&_nc_cat=1&ccb=1-7&_nc_sid=23dd7b&_nc_ohc=g0gLqfBm_VsQ7kNvwEMMXqu&_nc_oc=AdknHGoPFFmm37M356kQZ57VwcGP9tL8FTHZfCTjqAaiLrvpmySuaQapAeoIfQjQoLU&_nc_zt=26&_nc_ht=scontent.fhan3-1.fna&_nc_gid=OKtRkT8_Qgjikm6wGNwfLA&oh=00_AfWfx8SZWQsg3HbD_IewVF5V9wCpyv_UMJ9Y8tcIsLgnvQ&oe=68A0B137',
          width: 75,
          height: 75,
        },
      }}
      xstyle="w-full h-full"
    />
  );
};
