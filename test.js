// =========================================================
// NCS-STYLE LIVE RHYTHM ANIMATION (HOME PAGE)
// =========================================================
(() => {
	const canvas = document.querySelector("#ncs-rhythm-canvas");
	if (!canvas) return;

	const ctx = canvas.getContext("2d");
	if (!ctx) return;

	const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
	const barCount = 56;
	let animationFrameId = null;

	const resizeCanvas = () => {
		const rect = canvas.getBoundingClientRect();
		const dpr = Math.min(window.devicePixelRatio || 1, 2);
		const width = Math.max(1, Math.floor(rect.width));
		const height = Math.max(1, Math.floor(rect.height));

		if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
			canvas.width = width * dpr;
			canvas.height = height * dpr;
		}
		ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
		return { width, height };
	};

	const drawFrame = (timeMs) => {
		const { width, height } = resizeCanvas();
		ctx.clearRect(0, 0, width, height);

		const t = timeMs * 0.0042;
		const bassPulse = Math.pow(0.5 + 0.5 * Math.sin(t * 1.85), 2.2);
		const gap = Math.max(2, Math.floor(width * 0.004));
		const totalGap = gap * (barCount - 1);
		const barWidth = Math.max(2, (width - totalGap) / barCount);
		const centerIndex = (barCount - 1) / 2;
		const maxBarHeight = Math.max(10, height - 8);
		const baseY = height - 2;

		const gradient = ctx.createLinearGradient(0, baseY - maxBarHeight, 0, baseY);
		gradient.addColorStop(0, "#1ed760");
		gradient.addColorStop(0.55, "#1DB954");
		gradient.addColorStop(1, "#699950");

		for (let i = 0; i < barCount; i += 1) {
			const normalizedDist = Math.abs(i - centerIndex) / centerIndex;
			const centerEnvelope = 1 - normalizedDist * 0.45;

			const wave1 = 0.5 + 0.5 * Math.sin(t * 2.1 + i * 0.34);
			const wave2 = 0.5 + 0.5 * Math.cos(t * 3.3 - i * 0.52);
			const shimmer = 0.5 + 0.5 * Math.sin(t * 5.4 + i * 1.15);

			const energy =
				(wave1 * 0.45 + wave2 * 0.35 + shimmer * 0.2) * centerEnvelope +
				bassPulse * (1 - normalizedDist * 0.65) * 0.35;

			const clamped = Math.min(1, Math.max(0.12, energy));
			const barHeight = Math.max(4, clamped * maxBarHeight);
			const x = i * (barWidth + gap);
			const y = baseY - barHeight;

			ctx.fillStyle = gradient;
			ctx.globalAlpha = 0.55 + clamped * 0.45;

			if (typeof ctx.roundRect === "function") {
				ctx.beginPath();
				ctx.roundRect(x, y, barWidth, barHeight, [barWidth / 2, barWidth / 2, 1, 1]);
				ctx.fill();
			} else {
				ctx.fillRect(x, y, barWidth, barHeight);
			}

			ctx.fillStyle = "#b8f28c";
			ctx.fillRect(x, Math.max(1, y - 3), barWidth, 2);
		}

		ctx.globalAlpha = 1;

		if (!prefersReducedMotion.matches) {
			animationFrameId = requestAnimationFrame(drawFrame);
		}
	};

	const start = () => {
		if (animationFrameId !== null) {
			cancelAnimationFrame(animationFrameId);
			animationFrameId = null;
		}
		drawFrame(performance.now());
	};

	window.addEventListener("resize", () => {
		if (prefersReducedMotion.matches) {
			drawFrame(performance.now());
		}
	});

	prefersReducedMotion.addEventListener("change", start);
	start();
})();

// =========================================================
// SPOTYBAI MUSIC LIBRARY & PLAYER
// =========================================================
const tracks = [
	{
		title: "My Own Worst Enemy",
		artist: "Lit",
		audio: "audio/My Own Worst Enemy - Lit.mp3",		
		cover: "images/MyOwnWorstEnemy.jpg",
		video: "videos/Lit - My Own Worst Enemy (Official Music Video).mp4",
		lyrics: "[00:00.00]\n[00:18.00]Can we forget about the things I said when I was drunk?\n[00:24.00]I didn't mean to call you that\n[00:28.00]I can't remember what was said or what you threw at me\n[00:33.00]Please tell me\n[00:35.00]Please tell me, why\n[00:40.00]My car is in the front yard, and I'm\n[00:45.00]Sleeping with my clothes on\n[00:49.00]Came in through the window last night\n[00:54.00]Came in through the window last night\n[01:05.00]Came in through the window last night\n[01:10.00]'Cause every now and then, I kick the livin' shit out of me\n[01:14.00]The smoke alarm is goin' off, and there's a cigarette\n[01:19.00]Still burnin'\n[01:21.00]Please tell me, why\n[01:26.00]My car is in the front yard, and I'm\n[01:31.00]Sleepin' with my clothes on\n[01:36.00]Came in through the window last night\n[01:41:00]And you're gone, gone?\n[01:46.00]♪\n[01:58.00]Please tell me, why\n[02:03.00]My car is in the front yard, and I'm\n[02:08.00]Sleepin' with my clothes on\n[02:13.00]I came in through the window last night?\n[02:18.00](Ah-ooh) it's no surprise to me, I am my own worst enemy\n[02:23.00](Ah-ooh) 'cause every now and then, I kick the livin' shit out of me\n[02:28.00](Ah-ooh) can we forget about the things I said when I was drunk?\n[02:32.00](Ah-ooh) I didn't mean to call you that\n"
	},
	{
		title: "Promise",
		artist: "Laufey",
		audio: "audio/Laufey - Promise (Official Audio) - Laufey.mp3",
		cover: "images/Promise.jpg",
		video: "videos/Promise.mp4",
		lyrics: "[00:00.00]\n[00:14.00]I made a promise to distance myself\n[00:26.00]Took a flight through aurora skies\n[00:33.00]Honestly, I didn't think about how we didn't say Goodbye\n[00:43.00]Just, See you very soon\n[00:49.00]It hurts to be something\n[00:52.00]It's worse to be nothing with you\n[00:58.00]♪\n[01:00.00]Mm, mm-mm-mm\n[01:09.00]So I didn't call you for 16 long days\n[01:21.00]And I should get a cigarette for so much restraint\n[01:30.00]No matter how long I resist temptation, I will always lose\n[01:44.00]It hurts to be something\n[01:49.00]It's worse to be nothing with you\n[01:52.00]I've done the math\n[01:55.00]There's no solution\n[01:58.00]We'll never last\n[02:02.00]Why can't I let go of this?\n[02:10.00]♪\n[02:35.00]So I broke my promise\n[02:41.00]I called you last night\n[02:47.00]I shouldn't have, I wouldn't have\n[02:53.00]If it weren't for the sight of a boy who looked just like you\n[03:00.00]Standing out on Melrose Avenue\n[03:09.00]It hurts to be something\n[03:12.00]It's worse to be nothing with you\n[03:22.00]Mm, mm-mm\n[03:27.00]It hurts to be something\n[03:30.00]It's worse to be nothing with you\n"
	},
	{
		title: "Goddess",
		artist: "Laufey",
		audio: "audio/Laufey - Goddess (Official Audio With Lyrics) - Laufey.mp3",
		cover: "images/Goddess.png",
		video: "videos/Goddess_Laufey.mp4",
		lyrics: "[00:01.00]It always goes like this\n[00:05.00]Could have predicted it\n[00:10.00]I'm so naive to think to you love me for me\n[00:19.00]Kissed as I ran off-stage\n[00:23.00]Too old to play this game\n[00:28.00]Guess you're still growing up at 30\n[00:36.00]Oh-oh\n[00:44.00]Were you surprised by me when you took me home?\n[00:53.00]When the glamour wore off\n[00:59.00]Reduced to skin and bone\n[01:02.00]I can't even tell who you want to know\n[01:12.00]I'm a goddess on stage\n[01:17.00]Human when we're alone\n[01:28.00]♪\n[01:41.00]You took a star to bed\n[01:46.00]Woke up with me instead\n[01:49.00]You mush have felt so damn deceived\n[01:50.00]When you made up a version of me that you thought you'd love\n[02:07.00]But i am not you aphrodite\n[02:17.00]Oh-oh\n[02:25.00]Were you surprised by me when you took me home?\n[02:34.00]When the glamour wore off\n[02:39.00]Reduced to skin and bone\n[02:43.00]I can't even tell who you want to know\n[02:52.00]I'm a goddess on stage\n[02:58.00]Human when we're alone\n[03:08.00]♪\n[03:21.00]You took me for a fool\n[03:27.00]You stole my youth\n[03:32.00]You wanted this so much\n[03:38.00]You watched me rise then killed my light\n[03:48.00]And now you know I'm not your fucking goddess\n[04:06.00]Ooh, oh\n[04:15.00]I'm no goddess when I'm alone\n"
	},
	{
		title: "Cause You Have To",
		artist: "LANY",
		audio: "audio/LANY - _Cause You Have To (Official Lyric Video) - LANY.mp3",
		cover: "images/Causeyouhaveto.png",
		video: "videos/LANY - 'Cause You Have To (Official Lyric Video).mp4",
		lyrics: "[00:09.00]Chasing a heart is like chasing a ghost\n[00:13.00]You can't make somebody you love feel the same\n[00:17.00]If they don't\n[00:22.00]It doesn't matter the words that you say\n[00:26.00]'Cause, just like the seasons, you can't stop the way\n[00:30.00]People change\n[00:36.00]I'd drive through the night, walk a thousand miles\n[00:40.00]To feel your head on my chest\n[00:45.00]I'd give anything, that's what's killing me\n[00:49.00]'Cause you won't even reach across the bed\n[00:53.00]The silence is getting too cold\n[00:57.00]We stopped fighting 'cause deep down inside we both know\n[01:03.00]Just for once, what do you want? Baby, tell me the truth\n[01:08.00]Do you only love me 'cause you have to?\n[01:16.00]All of your friends now were all of mine first\n[01:20.00]Your mom and your dad they were both there for me\n[01:24.00]When mine weren't\n[01:29.00]I can't see tomorrow without you today\n[01:33.00]I'd rather let you go than make you feel like you've gotta stay\n[01:40.00]♪\n[01:43.00]I'd drive through the night, walk a thousand miles\n[01:47.00]To feel your head on my chest\n[01:52.00]I'd give anything, that's what's killing me\n[01:56.00]'Cause you won't even reach across the bed\n[02:00.00]The silence is getting too cold\n[02:04.00]We stopped fighting 'cause deep down inside we both know\n[02:10.00]Just for once, what do you want? Baby, tell me the truth\n[02:15.00]Do you only love me 'cause you have to?\n[02:18.00]So, come on, don't be afraid\n[02:22.00]I know you love me, I know you do\n[02:26.00]To break my heart, it only gets worse if you wait\n[02:28.00]So, just for once, what do you want? Baby, tell me the truth\n[02:33.00]Do you only love me 'cause you have to?\n[02:38.00]♪\n[02:43.00](Never)\n[02:48.00](I'll never know)\n[02:53.00]♪\n[02:56.00](Never) I'll never know\n[03:02.00]I'll never know, I'll never know (I'll never know)\n[03:12.00](Never)I'm so sorry, I wish I could be\n[03:21.00]The one to love you more (I'll never know)\n[03:29.00]I hope you find somebody who's got\n[03:36.00]Everything you're searching for\n[03:45.00]♪\n[3:48.00]The silence is getting too cold\n[03:51.00]We stopped fighting 'cause deep down inside we both know\n[03:57.00]Just for once, what do you want? Baby, tell me the truth?\n[04:02.00]Do you only love me 'cause you have to?\n"
	},
	{
		title: "Malibu Nights",
		artist: "LANY",
		audio: "audio/LANY - Malibu Nights (Official Audio) - LANY.mp3",
		cover: "images/MalibuNights.jpg",
		video: "videos/LANY - Malibu Nights (Official Video).mp4",
		lyrics: "[00:13.00]There's no reason, there's no rhyme\n[00:16.00]I found myself blindsided by\n[00:19.00]A feeling that I've never known\n[00:22.00]I'm dealing with it on my own\n[00:26.00]Phone is quiet, walls are bare\n[00:29.00]I drink myself to sleep, who cares\n[00:32.00]No one even has to know\n[00:35.00]I'm dealing with it on my own\n[00:39.00]♪\n[00:44.00]I've got way too much time to be this hurt\n[00:47.00]Somebody,help,it's getting worse\n[00:51.00]What do you do with a broken heart?\n[00:54.00]Once the light fades,everything is dark\n[00:57.00]Way too much whiskey in my blood\n[01:00.00]I feel my body giving up\n[01:04.00]Can I hold on for another night?\n[01:07.00]What do I do with all this time\n[01:12.00]♪\n[01:24.00]Every thought when it gets late\n[01:27.00]Put me in a fragile state\n[01:30.00]I wish I wasn't going home\n[01:34.00]Dealing with it on my own\n[01:37.00]I'm praying but it's not the enough\n[01:40.00]I'm done, I don't believe in love\n[01:43.00]Learning how to let it go\n[01:47.00]Dealing with it on my own\n[01:49.00]I've got way too much time to be this hurt\n[01:52.00]Somebody,help,it's getting worse\n[01:55.00]What do you do with a broken heart?\n[01:59.00]Once the light fades, everything is dark\n[02:02.00]Way too much whiskey in my blood\n[02:05.00]I feel my giving up\n[02:09.00]Can I hold on for another night?\n[02:12.00]What do I do with all ths time, yeah?\n[02:16.00]I drive circles\n[02:18.00]Under street lights\n[02:21.00]Nothing seems to clear my mind\n[02:25.00]I can't forget if it's inside my head so\n[02:29.00]I drive chasing\n[02:32.00]Malibu nights\n[02:34.00]Nothing seems to hear my mind\n[02:37.00]I can't forget\n[02:41.00]I've got way too much time to be this hurt\n[02:44.00]Somebody,help,it's getting worse\n[02:47.00]What do you do with a broken heart?\n[02:51.00]Once the light fades,everything is dark\n[02:54.00]Way too much whiskey in my blood\n[02:57.00]I feel my body giving up\n[03:00.00]Can I hold on for another night?\n[03:04.00]What do I do with all this time, yeah\n[03:09.00]♪\n[03:21.00]I drive circles\n[03:23.00]Under street lights\n[03:26.00]Nothing seems to clear my mind\n[03:29.00]I can't forget if it's inside my head so\n[03:34.00]I drive chasing\n[03:36.00]Malibu nights\n[03:39.00]Nothings seems to heal my mind\n[03:42.00]I can't forget\n[03:46.00]I drive chasing\n[03:49.00]Malibu nights\n  "
	},
	{
		title: "Fragile",
		artist: "Laufey",
		audio: "audio/Fragile - Laufey.mp3",
		cover: "images/Fragile.jpg",
		video: "videos/Fragile.mp4",
		lyrics: "[00:25.00]Will you let me come closer to you?\n[00:31.00]I know that you're older, but what can I do?\n[00:38.00]I leave in the morning, I'll forget that I am surely falling (ah-ah)\n[00:51.00]Grew up in a case of fragile glass\n[00:57.00]But hammer away, it's time to crash\n[01:04.00]And as it shatters, let me shatter into you\n[01:14.00]The soft candle glow\n[01:17.00]The music so slow\n[01:21.00]Your skin on my skin\n[01:24.00]The room is spinning\n[01:28.00]Nerve on my bone\n[01:30.00]I'm shaking, oh, no\n[01:34.00]I'm talking though, I shouldn't be\n[01:37.00]I've lost all sensibility\n[01:40.00]Ooh-ooh-ooh-ooh-ooh\n[01:45.00]I've never been so fragile\n[01:53.00]Ooh-ooh, ooh-ooh, ha-ah-ah\n[02:01.00]It's been a year and 40 days\n[02:07.00]Since you picked me up and swept me away\n[02:14.00]I wanted to run with you into the midnight sun with you\n[02:26.00]Now I sit around and rust in rain\n[02:33.00]Turn into dust as I just wait\n[02:39.00]For someone to hold me like you did that night, I still remember\n[02:51.00]The soft candle glow\n[02:53.00]The music so slow\n[02:57.00]Your skin on my skin\n[03:00.00]The room is spinning\n[03:04.00]'Round, I'm alone\n[03:06.00]New town, on my own\n[03:09.00]I'm missing you, I shouldn't be\n[03:13.00]I've lost all sensibility\n[03:16.00]Ooh-ooh-ooh-ooh-ooh\n[03:21.00]I've never been so fragile\n[03:29.00]Fragile\n"
	},
	{
		title: "Heaven",
		artist: "Bryan Adams",
		audio: "audio/Bryan Adams - Heaven (Classic Version) - Bryan Adams.mp3",
		cover: "images/Bryanadams_-_Heaven_Cover.jpg",
		video: "videos/Bryan Adams - Heaven (Classic Version).mp4",
		lyrics: "[00:16.00]Oh, thinkin' about all our younger years\n[00:21.00]There was only you and me\n[00:25.00]we were young and wild and free\n[00:29.00]Now, nothing can take you away from me\n[00:35.00]We've been down that down that road before\n[00:38.00]But that's over now\n[00:42.00]You keep me comin'back for more\n[00:45.00]Baby, you're all that i want\n[00:48.00]When you're lyin'here in my arms\n[00:57.00]I'm findin' it hard to believe\n[00:55.00]We're in heaven\n[00:59.00]And love is all that i need\n[01:02.00]And I found it there in your heart\n[01:06.00]Isn;t too hard to see\n[01:09.00]We're in heaven\n[01:14.00]♪\n[01:22.00]Oh, once in your life you find someone\n[01:28.00]Who will turn your world around\n[01:32.00]Bring you up when you're feelin' down\n[01:36.00]Yeah, nothin' can change what you mean to me\n[01:41.00]Oh, there's lots that i could say\n[01:45.00]Just hold me now\n[01:49.00]'Cause our love will light the way\n[01:53.00]And, baby, you're all that i want\n[01:55.00]When you're lyin'here in my arms\n[01:59.00]I'm findin' it hard to believe\n[02:02.00]We're in heaven\n[02:06.00]Yeah, love is all that I need\n[02:09.00]It isn't too hard see\n[02:16.00]We're in heaven, yeah\n[02:25.00]I've been waitin'for so long\n[02:28.00]For somethin' to arrive\n[02:31.00]For love to come alone\n[02:38.00]Now our dreams are comin' true\n[02:42.00]Through the good times and the bad\n[02:47.00]Yeah, I'll standin' there by you, oh\n[02:53.00]♪\n[03:04.00]And,baby, you're all that i want\n[03:07.00]When you're lyin'here in my arms\n[03:11.00]I'm findin' it hard to believe\n[03:14.00]We're in heaven\n[03:17.00]And love is all that i need\n[03:21.00]And I found it there in you heart\n[03:24.00]Isn't too hard to see\n[03:27.00]We're in heaven, heaven, whoa-oh-oh\n[03:38.00]You're all that i want\n[03:40.00]"
	},
	{
		title: "Feelings",
		artist: "Lauv",
		audio: "audio/Lauv - Feelings (Lyrics).mp3",
		cover: "images/Feeling.png",
		video: "videos/Lauv - Feelings [Official Visualizer].mp4",
		lyrics: "[00:00.00]\n[00:13.00]Is my love too much?\n[00:15.00]Or is it just enough for you, for you?\n[00:22.00]'Cause it's getting late, would you like to stay? Ah\n[00:29.00]'Cause I'm bad at reading signs\n[00:31.00]But I, I wanna do whatever you wanna do\n[00:36.00]If you wanted to, girl, we could cross that line\n[00:42.00]Know we've been friends\n[00:43.00]And love only knows broken ends\n[00:46.00]Yeah, that's what you said	\n[00:48.00]But girl, let me change your mind\n[00:52.00]Mmm, mmm, mmm\n[00:57.00]'Cause feelings are hard to find\n[01:00.00]Mmm, mmm, mmm\n[01:07.00]Feelings are hard\n[01:08.00]But I feel 'em in my chest\n[01:10.00]A tiny war within\n[01:13.00]But when I pull you closer\n[01:16.00]Girl, I can't explain\n[01:18.00]But I, I wanna do whatever you wanna do\n[01:23.00]If you wanted to, girl, we could cross that line\n[01:28.00]Know we've been friends\n[01:30.00]And love only knows broken ends\n[01:32.00]Yeah, that's what you said\n[01:34.00]But girl, let me change your mind\n[01:37.00]Mmm, mmm, mmm\n[01:44.00]'Cause feelings are hard to find\n[01:47.00]Mmm, mmm, mmm\n[01:54.00]Feelings are hard\n[01:55.00]And I know, and I know that it hurts sometimes\n[01:57.00]That it hurts sometimes when I'm with you\n[02:00.00]And I know, and I know that it hurts sometimes\n[02:02.00]That it hurts sometimes, but I miss you\n[02:05.00]And I know, and I know that it's on your mind\n[02:07.00]That it's on your mind when I kiss you\n[02:09.00]But I wanna do whatever you wanna do\n[02:15.00]I wanna do whatever you wanna do\n[02:15.00]Mmm, mmm, mmm\n[02:19.00]If you wanted to, girl, we could cross that line\n[02:24.00]Know we've been friends\n[02:26.00]And love only knows broken ends\n[02:28.00]Yeah, that's what you said\n[02:30.00]But girl, let me change your mind\n[02:33.00]Mmm, mmm, mmm\n[02:39.00]'Cause feelings are hard to find\n[02:43.00]Mmm, mmm, mmm\n[02:50.00]Feelings are hard to find, yeah\n"
	},
	{
		title: "Always",
		artist: "Daniel Caesar",
		audio: "audio/Daniel Caesar - Always (Official Audio).mp3",
		cover: "images/Always.png",
		video: "videos/Daniel Caesar - Always (Official Lyric Video) (online-video-cutter.com).mp4",
		lyrics: "[00:15.00]Baby, baby, there will always be\n[00:22:00]A space for you and me, right where you left it\n[00:29.00]And just maybe, enough time will pass\n[00:36.00]We'll look back and laugh, just don't forget it\n[00:42.00]And maybe I'm wrong for writing this song\n[00:49.00]Losing my head over you\n[00:57.00]And I'll be here, 'cause we both know how it goes\n[01:01.00]I don't want things to change, I pray they stay the same always\n[01:11.00]And I don't care if you're with somebody else\n[01:15	.00]I'll give you time and space, just know I'm not a phase\n[01:21.00]I'm always, ways, ways\n[01:25.00]Always, ways, ways\n[01:28.00]I'm always, ways, ways\n[01:36.00]Pretty lady, used to walk with me\n[01:43.00]Down Bloor street, oh, what a time\n[01:50.00]And I still remember the fussin', the fightin', the fuckin', the lyin'\n[01:56.00]It's all fine, you'll always be mine\n[02:03.00]And maybe I'm wrong (hey, babe, you could)\n[02:06.00]For writing this song (write me a song)\n[02:10.00]Losing my head over you\n[02:23.00]I'll give you time and space, just know I'm not a phase\n[02:18.00]And I'll be here, 'cause we both know how it goes\n[02:22.00]I don't want things to change, I pray they stay the same always\n[02:32.00]And I don't care if you're with somebody else\n[02:36.00]I'll give you time and space, just know I'm not a phase\n[02:42.00]I'm always, ways, ways\n[02:46.00]Always, ways, ways\n[02:50.00]I'm always, ways, ways\n[02:58.00]Always, you can count on it, sure as the stars in the sky\n[03:04.00]Always, you can count on it, sure as the sun will rise\n[03:11.00]Always, my love for you ain't goin' nowhere\n[03:18.00]Always, I will be here\n"
	},
	{
		title: "Loose",
		artist: "Daniel Caesar",
		audio: "audio/Loose.mp3",
		cover: "images/Loose.png",
		video: "videos/Daniel Caesar - Loose (Music Video).mp4",
		lyrics: "[00:00.00]If you ever start to wonder\n[00:07.00]Why all the rain and all the thunder follows her around\n[00:22.00]You better cut that girl loose\n[00:28.00]Most of the time, everything's fine\n[00:35.00]But as soon as she starts to whine\n[00:41.00]If you have no patience\n[00:48.00]You better cut that girl loose\n[00:51.00]What are you, a coward?\n[00:54.00]Who are you helping?\n[00:59.00]You got the power\n[01:05.00]Then do what you said you can\n[01:09.00]And do it for her\n[01:17.00]You better cut that girl loose, ah\n[01:23.00]Set her free, let her be\n[01:29.00]♪\n[01:39.00]Leave her be, oh yes\n[01:56.00]You don't love me anymore\n[02:02.00]Let's see how you like this song\n[02:11.00]See you walking out the door\n[02:16.00]Wonder why it took you so long\n[02:23.00]♪\n[02:28.00]Ever since the day that I met you\n[02:35.00]Knew you were the girl of my dreams\n[02:39.00]But we could never be (hello?)\n[02:46.00]Yeah, sorry, I was just getting everything out\n[02:49.00]Thank you, I'll be outside\n[02:56.00]Sorry, I was actually just gonna take my phone\n[03:01.00]Take it\n[03:02.00]So write down any phone number if you need it\n"
	}
];

const audio = document.querySelector("#audio-player");
const FAVORITES_STORAGE_KEY = "spotybai_favorites";
const PLAYLISTS_STORAGE_KEY = "spotybai_playlists";

// Only set up player behavior on pages that contain the audio element.
if (audio) {
	// Cache player controls and keep track of the current song and lyric line.
	const musicContentEl = document.querySelector(".music-content");
	const list = document.querySelector("#track-list");
	const search = document.querySelector("#track-search");
	const navTabs = [...document.querySelectorAll(".nav-tab")];
	const customPlaylistListEl = document.querySelector("#custom-playlist-list");
	const createPlaylistButton = document.querySelector("#create-playlist-button");
	const playlistTypeEl = document.querySelector("#playlist-type");
	const libraryTitleEl = document.querySelector("#library-title");
	const playlistSummaryEl = document.querySelector("#playlist-summary");
	const playlistActionsEl = document.querySelector("#playlist-actions");
	const renamePlaylistButton = document.querySelector("#rename-playlist-button");
	const deletePlaylistButton = document.querySelector("#delete-playlist-button");
	const favoriteButton = document.querySelector("#favorite-button");
	const addToPlaylistButton = document.querySelector("#add-to-playlist-button");

	// Queue Drawer elements
	const queueDrawerButton = document.querySelector("#queue-drawer-button");
	const queueCountBadge = document.querySelector("#queue-count-badge");
	const queueDrawerEl = document.querySelector("#queue-drawer");
	const closeQueueDrawerButton = document.querySelector("#close-queue-drawer");
	const clearQueueButton = document.querySelector("#clear-queue-button");
	const queueContextLabelEl = document.querySelector("#queue-context-label");
	const queueNowPlayingEl = document.querySelector("#queue-now-playing");
	const queueManualListEl = document.querySelector("#queue-manual-list");
	const queueUpcomingListEl = document.querySelector("#queue-upcoming-list");
	const queueShuffleNoteEl = document.querySelector("#queue-shuffle-note");

	// Playback Speed & Sleep Timer elements
	const playbackSpeedSelect = document.querySelector("#playback-speed-select");
	const sleepTimerSelect = document.querySelector("#sleep-timer-select");
	const sleepTimerRemainingEl = document.querySelector("#sleep-timer-remaining");

	// Playlist Name Modal elements
	const nameModalBackdrop = document.querySelector("#playlist-name-modal-backdrop");
	const nameModalTitleEl = document.querySelector("#playlist-name-modal-title");
	const closeNameModalButton = document.querySelector("#close-playlist-name-modal");
	const nameFormEl = document.querySelector("#playlist-name-form");
	const nameInputEl = document.querySelector("#playlist-name-input");
	const nameErrorEl = document.querySelector("#playlist-name-error");
	const cancelNameButton = document.querySelector("#cancel-playlist-name-button");
	const saveNameButton = document.querySelector("#save-playlist-name-button");

	// Delete Playlist Confirmation Modal elements
	const deleteModalBackdrop = document.querySelector("#playlist-delete-modal-backdrop");
	const closeDeleteModalButton = document.querySelector("#close-playlist-delete-modal");
	const deleteMessageEl = document.querySelector("#playlist-delete-message");
	const cancelDeleteButton = document.querySelector("#cancel-playlist-delete-button");
	const confirmDeleteButton = document.querySelector("#confirm-playlist-delete-button");

	// Playlist Picker Modal elements
	const modalBackdrop = document.querySelector("#playlist-modal-backdrop");
	const closePlaylistModalButton = document.querySelector("#close-playlist-modal");
	const playlistModalSongEl = document.querySelector("#playlist-modal-song");
	const playlistPickerListEl = document.querySelector("#playlist-picker-list");
	const modalNewPlaylistButton = document.querySelector("#modal-new-playlist-button");

	const playButton = document.querySelector("#play-button");
	const shuffleButton = document.querySelector("#shuffle-button");
	const repeatButton = document.querySelector("#repeat-button");
	const seekBar = document.querySelector("#seek-bar");
	const volumeBar = document.querySelector("#volume-bar");
	const muteButton = document.querySelector("#mute-button");
	const nowPlayingButton = document.querySelector("#now-playing-button");
	const nowPlayingPanel = document.querySelector("#now-playing-panel");
	const nowPlayingCollapseButton = document.querySelector("#now-playing-collapse-button");
	const lyricsPanel = document.querySelector("#lyrics-panel");
	const lyricsContent = document.querySelector("#lyrics-content");
	const trackVideo = document.querySelector("#track-video");
	const toggleLyricsButton = document.querySelector("#toggle-lyrics");
	const status = document.querySelector("#player-status");

	const mediaStageEl = document.querySelector("#media-stage");
	const toggleMediaCollapseButton = document.querySelector("#toggle-media-collapse");
	const toggleLyricsCollapseButton = document.querySelector("#toggle-lyrics-collapse");

	const PLAYLIST_BACKGROUNDS = {
		all: "images/Gradient Fog.jpeg",
		favorites: "images/rere.jpeg"
	};

	const setMusicSectionBackground = (imagePath = "") => {
		if (!musicContentEl) return;
		musicContentEl.style.setProperty(
			"--music-bg-image",
			imagePath ? `url("${imagePath}")` : "none"
		);
	};

	let favoriteIds = [];
	try {
		const savedFavs = JSON.parse(localStorage.getItem(FAVORITES_STORAGE_KEY));
		if (Array.isArray(savedFavs)) favoriteIds = savedFavs;
	} catch (error) {
		console.error("Unable to load saved favorites:", error);
	}

	let playlists = [];
	try {
		const savedPlaylists = JSON.parse(localStorage.getItem(PLAYLISTS_STORAGE_KEY));
		if (Array.isArray(savedPlaylists)) {
			playlists = savedPlaylists.filter(
				(pl) => pl && typeof pl.id === "string" && typeof pl.name === "string" && Array.isArray(pl.tracks)
			);
		}
	} catch (error) {
		console.error("Unable to load saved playlists:", error);
	}

	// View state: "all" | "favorites" | "playlist:<id>"
	let activeView = "all";
	let selectedIndex = -1;
	let manualQueue = []; // Array of track indices queued to play next
	let pickerTrackIndex = -1;
	let nameModalState = null; // { mode: "create" | "rename", playlistId?: string, onComplete?: (createdPlaylist) => void }
	let pendingDeletePlaylistId = null;
	let shuffleEnabled = false;
	let repeatOnceEnabled = false;
	let repeatConsumed = false;
	let previousVolume = Number(volumeBar.value);
	let lyricLines = [];
	let activeLyricIndex = -1;
	let mediaCollapsed = false;
	let lyricsSectionCollapsed = false;

	// Sleep timer state
	let sleepMode = "off"; // "off" | "end" | "timed"
	let sleepDeadline = null;
	let sleepIntervalId = null;

	const getTrackKey = (track) => track.audio || `${track.title} — ${track.artist}`;
	const isFavorite = (track) => Boolean(track) && favoriteIds.includes(getTrackKey(track));

	const getActivePlaylistId = () => {
		if (activeView.startsWith("playlist:")) {
			return activeView.slice("playlist:".length);
		}
		return null;
	};

	const getActivePlaylist = () => {
		const id = getActivePlaylistId();
		if (!id) return null;
		return playlists.find((pl) => pl.id === id) || null;
	};

	const isTrackInAnyPlaylist = (track) => {
		if (!track) return false;
		const key = getTrackKey(track);
		return playlists.some((pl) => pl.tracks.includes(key));
	};

	const saveFavorites = () => {
		try {
			localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favoriteIds));
		} catch (error) {
			console.error("Unable to save favorites:", error);
		}
	};

	const savePlaylists = () => {
		try {
			localStorage.setItem(PLAYLISTS_STORAGE_KEY, JSON.stringify(playlists));
		} catch (error) {
			console.error("Unable to save playlists:", error);
		}
	};

	const getFilteredIndices = (query = "") => {
		const normalizedQuery = query.trim().toLowerCase();
		const activePlaylist = getActivePlaylist();
		const indices = [];

		tracks.forEach((track, index) => {
			if (activeView === "favorites" && !isFavorite(track)) return;
			if (activePlaylist && !activePlaylist.tracks.includes(getTrackKey(track))) return;
			if (!`${track.title} ${track.artist}`.toLowerCase().includes(normalizedQuery)) return;
			indices.push(index);
		});
		return indices;
	};

	// --- Up Next / Queue Drawer Helpers ---
	const getUpcomingLibraryIndices = () => {
		const filtered = getFilteredIndices(search.value);
		const candidates = filtered.length ? filtered : tracks.map((_, i) => i);
		if (!candidates.length) return [];

		if (shuffleEnabled) {
			return candidates.filter((idx) => idx !== selectedIndex);
		}

		const currentPos = candidates.indexOf(selectedIndex);
		if (currentPos < 0) return [...candidates];

		const ordered = [];
		for (let step = 1; step < candidates.length; step += 1) {
			ordered.push(candidates[(currentPos + step) % candidates.length]);
		}
		return ordered;
	};

	const enqueueTrackNext = (index) => {
		const track = tracks[index];
		if (!track) return;
		manualQueue.push(index);
		renderQueueDrawer();
		status.textContent = `Queued "${track.title}" to play next.`;
	};

	const removeQueuedItem = (queuePos) => {
		if (queuePos < 0 || queuePos >= manualQueue.length) return;
		const [removedIdx] = manualQueue.splice(queuePos, 1);
		renderQueueDrawer();
		if (tracks[removedIdx]) {
			status.textContent = `Removed "${tracks[removedIdx].title}" from queue.`;
		}
	};

	const createQueueRow = (track, { isCurrent = false, onPlay = null, onRemove = null, badgeText = "" } = {}) => {
		const row = document.createElement("div");
		row.className = `queue-item${isCurrent ? " is-now-playing" : ""}`;

		const playBtn = document.createElement("button");
		playBtn.type = "button";
		playBtn.className = "queue-item-play";
		playBtn.setAttribute("aria-label", `Play ${track.title} by ${track.artist}`);

		const img = document.createElement("img");
		img.src = track.cover;
		img.alt = "";

		const meta = document.createElement("div");
		meta.className = "queue-item-meta";

		const titleEl = document.createElement("strong");
		titleEl.textContent = track.title;

		const artistEl = document.createElement("span");
		artistEl.textContent = badgeText ? `${track.artist} · ${badgeText}` : track.artist;

		meta.append(titleEl, artistEl);
		playBtn.append(img, meta);

		if (typeof onPlay === "function") {
			playBtn.addEventListener("click", onPlay);
		}

		row.append(playBtn);

		if (typeof onRemove === "function") {
			const removeBtn = document.createElement("button");
			removeBtn.type = "button";
			removeBtn.className = "icon-button";
			removeBtn.setAttribute("aria-label", `Remove ${track.title} from queue`);
			removeBtn.title = "Remove from queue";
			removeBtn.innerHTML = '<i class="fa-solid fa-xmark" aria-hidden="true"></i>';
			removeBtn.addEventListener("click", onRemove);
			row.append(removeBtn);
		}

		return row;
	};

	const renderQueueDrawer = () => {
		if (queueCountBadge) {
			queueCountBadge.textContent = String(manualQueue.length);
			queueCountBadge.hidden = manualQueue.length === 0;
		}
		if (clearQueueButton) {
			clearQueueButton.hidden = manualQueue.length === 0;
		}

		if (!queueDrawerEl) return;

		const activePlaylist = getActivePlaylist();
		if (queueContextLabelEl) {
			const baseLabel = activeView === "favorites"
				? "My Favorites"
				: activePlaylist
					? activePlaylist.name
					: "Mga Yearner";
			const queryText = search.value.trim();
			queueContextLabelEl.textContent = queryText
				? `Filtered "${queryText}" in ${baseLabel}`
				: `Playing from ${baseLabel}`;
		}

		if (queueShuffleNoteEl) {
			queueShuffleNoteEl.textContent = shuffleEnabled ? "Shuffle pool" : "In order";
		}

		// 1. Now Playing
		if (queueNowPlayingEl) {
			queueNowPlayingEl.replaceChildren();
			const currentTrack = tracks[selectedIndex];
			if (currentTrack) {
				queueNowPlayingEl.append(
					createQueueRow(currentTrack, {
						isCurrent: true,
						badgeText: audio.paused ? "Paused" : "Playing",
						onPlay: () => {
							if (audio.paused) audio.play().catch(() => {});
						}
					})
				);
			} else {
				const empty = document.createElement("p");
				empty.className = "queue-empty-note";
				empty.textContent = "No song selected yet.";
				queueNowPlayingEl.append(empty);
			}
		}

		// 2. Queued Next
		if (queueManualListEl) {
			queueManualListEl.replaceChildren();
			if (!manualQueue.length) {
				const empty = document.createElement("p");
				empty.className = "queue-empty-note";
				empty.textContent = "Queue is empty. Click the queue icon on any song card to play it next.";
				queueManualListEl.append(empty);
			} else {
				manualQueue.forEach((trackIdx, qPos) => {
					const track = tracks[trackIdx];
					if (!track) return;
					queueManualListEl.append(
						createQueueRow(track, {
							badgeText: `#${qPos + 1} in queue`,
							onPlay: () => {
								manualQueue.splice(qPos, 1);
								selectTrack(trackIdx, true);
							},
							onRemove: () => removeQueuedItem(qPos)
						})
					);
				});
			}
		}

		// 3. Up Next from Library
		if (queueUpcomingListEl) {
			queueUpcomingListEl.replaceChildren();
			const upcomingIndices = getUpcomingLibraryIndices();
			if (!upcomingIndices.length) {
				const empty = document.createElement("p");
				empty.className = "queue-empty-note";
				empty.textContent = "No additional songs in this view.";
				queueUpcomingListEl.append(empty);
			} else {
				upcomingIndices.forEach((trackIdx) => {
					const track = tracks[trackIdx];
					if (!track) return;
					queueUpcomingListEl.append(
						createQueueRow(track, {
							onPlay: () => selectTrack(trackIdx, true)
						})
					);
				});
			}
		}
	};

	const toggleQueueDrawer = (forceOpen) => {
		if (!queueDrawerEl || !queueDrawerButton) return;
		const willOpen = typeof forceOpen === "boolean" ? forceOpen : queueDrawerEl.hidden;
		queueDrawerEl.hidden = !willOpen;
		queueDrawerButton.setAttribute("aria-expanded", String(willOpen));
		if (willOpen) renderQueueDrawer();
	};

	// --- Playback Speed & Sleep Timer Helpers ---
	const applyPlaybackSpeed = () => {
		if (!playbackSpeedSelect) return;
		const rate = Number(playbackSpeedSelect.value) || 1;
		audio.playbackRate = rate;
		trackVideo.playbackRate = rate;
		playbackSpeedSelect.closest(".compact-control")?.classList.toggle("is-active", rate !== 1);
	};

	const formatCountdown = (ms) => {
		const totalSeconds = Math.max(0, Math.ceil(ms / 1000));
		const mins = Math.floor(totalSeconds / 60);
		const secs = String(totalSeconds % 60).padStart(2, "0");
		return `${mins}:${secs}`;
	};

	const clearSleepTimer = (resetDropdown = true) => {
		if (sleepIntervalId !== null) {
			clearInterval(sleepIntervalId);
			sleepIntervalId = null;
		}
		sleepMode = "off";
		sleepDeadline = null;
		if (sleepTimerRemainingEl) {
			sleepTimerRemainingEl.hidden = true;
			sleepTimerRemainingEl.textContent = "";
		}
		if (resetDropdown && sleepTimerSelect) {
			sleepTimerSelect.value = "off";
		}
		sleepTimerSelect?.closest(".compact-control")?.classList.remove("is-active");
	};

	const triggerSleepPause = (reason) => {
		audio.pause();
		trackVideo.pause();
		clearSleepTimer(true);
		status.textContent = reason;
	};

	const updateSleepTimerTick = () => {
		if (sleepMode !== "timed" || !sleepDeadline) return;
		const remaining = sleepDeadline - Date.now();
		if (remaining <= 0) {
			triggerSleepPause("Sleep timer ended — playback paused.");
			return;
		}
		if (sleepTimerRemainingEl) {
			sleepTimerRemainingEl.hidden = false;
			sleepTimerRemainingEl.textContent = formatCountdown(remaining);
		}
	};

	const setSleepTimerMode = (value) => {
		clearSleepTimer(false);
		if (value === "off") return;

		const container = sleepTimerSelect?.closest(".compact-control");
		if (container) container.classList.add("is-active");

		if (value === "end") {
			sleepMode = "end";
			if (sleepTimerRemainingEl) {
				sleepTimerRemainingEl.hidden = false;
				sleepTimerRemainingEl.textContent = "1 song";
			}
			status.textContent = "Sleep timer set: will pause after the current song.";
			return;
		}

		const minutes = Number(value);
		if (Number.isFinite(minutes) && minutes > 0) {
			sleepMode = "timed";
			sleepDeadline = Date.now() + minutes * 60 * 1000;
			updateSleepTimerTick();
			sleepIntervalId = setInterval(updateSleepTimerTick, 1000);
			status.textContent = `Sleep timer set for ${minutes} minutes.`;
		}
	};

	const updateFavoriteButton = () => {
		if (!favoriteButton) return;
		const currentTrack = tracks[selectedIndex];
		if (!currentTrack) {
			favoriteButton.disabled = true;
			favoriteButton.classList.remove("is-favorite");
			favoriteButton.setAttribute("aria-pressed", "false");
			favoriteButton.setAttribute("aria-label", "Add to favorites");
			favoriteButton.title = "Add to favorites";
			favoriteButton.innerHTML = '<i class="fa-regular fa-heart" aria-hidden="true"></i>';
			return;
		}

		const fav = isFavorite(currentTrack);
		favoriteButton.disabled = false;
		favoriteButton.classList.toggle("is-favorite", fav);
		favoriteButton.setAttribute("aria-pressed", String(fav));
		favoriteButton.setAttribute(
			"aria-label",
			fav ? `Remove ${currentTrack.title} from favorites` : `Add ${currentTrack.title} to favorites`
		);
		favoriteButton.title = fav ? "Remove from favorites" : "Add to favorites";
		favoriteButton.innerHTML = fav
			? '<i class="fa-solid fa-heart" aria-hidden="true"></i>'
			: '<i class="fa-regular fa-heart" aria-hidden="true"></i>';
	};

	const updatePlayerPlaylistButton = () => {
		if (!addToPlaylistButton) return;
		const currentTrack = tracks[selectedIndex];
		if (!currentTrack) {
			addToPlaylistButton.disabled = true;
			addToPlaylistButton.classList.remove("has-playlist");
			return;
		}
		addToPlaylistButton.disabled = false;
		addToPlaylistButton.classList.toggle("has-playlist", isTrackInAnyPlaylist(currentTrack));
	};

	const renderSidebarPlaylists = () => {
		if (!customPlaylistListEl) return;
		customPlaylistListEl.replaceChildren();

		if (!playlists.length) {
			const empty = document.createElement("p");
			empty.className = "playlist-empty-note";
			empty.textContent = "No custom playlists yet. Click + New to create one.";
			customPlaylistListEl.append(empty);
			return;
		}

		const activePlaylistId = getActivePlaylistId();

		playlists.forEach((pl) => {
			const item = document.createElement("div");
			item.className = `playlist-sidebar-item${pl.id === activePlaylistId ? " is-active" : ""}`;

			const selectBtn = document.createElement("button");
			selectBtn.type = "button";
			selectBtn.className = "playlist-select-button";
			selectBtn.innerHTML = '<i class="fa-solid fa-list-ul" aria-hidden="true"></i>';

			const nameSpan = document.createElement("span");
			nameSpan.className = "playlist-select-name";
			nameSpan.textContent = pl.name;
			selectBtn.append(nameSpan);

			selectBtn.addEventListener("click", () => {
				setActiveView(`playlist:${pl.id}`);
			});

			const itemActions = document.createElement("div");
			itemActions.className = "playlist-item-actions";

			const renameBtn = document.createElement("button");
			renameBtn.type = "button";
			renameBtn.className = "playlist-rename-icon-btn";
			renameBtn.setAttribute("aria-label", `Rename ${pl.name}`);
			renameBtn.title = `Rename ${pl.name}`;
			renameBtn.innerHTML = '<i class="fa-solid fa-pen" aria-hidden="true"></i>';
			renameBtn.addEventListener("click", (event) => {
				event.stopPropagation();
				openRenamePlaylistModal(pl.id);
			});

			const deleteBtn = document.createElement("button");
			deleteBtn.type = "button";
			deleteBtn.className = "playlist-delete-icon-btn";
			deleteBtn.setAttribute("aria-label", `Delete ${pl.name}`);
			deleteBtn.title = `Delete ${pl.name}`;
			deleteBtn.innerHTML = '<i class="fa-solid fa-trash" aria-hidden="true"></i>';
			deleteBtn.addEventListener("click", (event) => {
				event.stopPropagation();
				openDeletePlaylistModal(pl.id);
			});

			itemActions.append(renameBtn, deleteBtn);
			item.append(selectBtn, itemActions);
			customPlaylistListEl.append(item);
		});
	};

	const updatePlaylistHeader = () => {
		const activePlaylist = getActivePlaylist();

		if (activeView === "favorites") {
			const favCount = tracks.filter((t) => isFavorite(t)).length;
			if (playlistTypeEl) playlistTypeEl.textContent = "Saved Collection";
			if (libraryTitleEl) libraryTitleEl.textContent = "My Favorites";
			if (playlistSummaryEl) {
				playlistSummaryEl.textContent = `${favCount} ${favCount === 1 ? "song" : "songs"}`;
			}
			if (playlistActionsEl) {
				playlistActionsEl.hidden = true;
				playlistActionsEl.style.display = "none";
			}
			setMusicSectionBackground(PLAYLIST_BACKGROUNDS.favorites);
		} else if (activePlaylist) {
			const validCount = tracks.filter((t) => activePlaylist.tracks.includes(getTrackKey(t))).length;
			if (playlistTypeEl) playlistTypeEl.textContent = "Custom Playlist";
			if (libraryTitleEl) libraryTitleEl.textContent = activePlaylist.name;
			if (playlistSummaryEl) {
				playlistSummaryEl.textContent = `${validCount} ${validCount === 1 ? "song" : "songs"}`;
			}
			if (playlistActionsEl) {
				playlistActionsEl.hidden = false;
				playlistActionsEl.style.display = "";
			}
			setMusicSectionBackground(activePlaylist.cover || PLAYLIST_BACKGROUNDS.all);
		} else {
			if (playlistTypeEl) playlistTypeEl.textContent = "Public Playlist";
			if (libraryTitleEl) libraryTitleEl.textContent = "Mga Yearner";
			if (playlistSummaryEl) {
				playlistSummaryEl.textContent = `${tracks.length} songs, about 38 min 20 sec`;
			}
			if (playlistActionsEl) {
				playlistActionsEl.hidden = true;
				playlistActionsEl.style.display = "none";
			}
			setMusicSectionBackground(PLAYLIST_BACKGROUNDS.all);
		}
	};

	const setActiveView = (nextView) => {
		activeView = nextView;
		navTabs.forEach((btn) => {
			const isSelected = btn.dataset.view === activeView;
			btn.classList.toggle("is-active", isSelected);
			btn.setAttribute("aria-pressed", String(isSelected));
		});
		renderSidebarPlaylists();
		updatePlaylistHeader();
		renderTracks(search.value);
		renderQueueDrawer();
	};

	const setNameModalError = (message = "") => {
		if (!nameErrorEl) return;
		nameErrorEl.textContent = message;
		nameErrorEl.hidden = !message;
	};

	const openNameModal = ({ mode, initialValue = "", playlistId = null, onComplete = null }) => {
		if (!nameModalBackdrop || !nameInputEl) return;
		nameModalState = { mode, playlistId, onComplete };
		if (nameModalTitleEl) {
			nameModalTitleEl.textContent = mode === "rename" ? "Rename Playlist" : "Create Playlist";
		}
		if (saveNameButton) {
			saveNameButton.textContent = mode === "rename" ? "Rename" : "Create";
		}
		nameInputEl.value = initialValue;
		setNameModalError("");
		nameModalBackdrop.hidden = false;
		requestAnimationFrame(() => {
			nameInputEl.focus();
			nameInputEl.select();
		});
	};

	const closeNameModal = () => {
		if (!nameModalBackdrop) return;
		nameModalBackdrop.hidden = true;
		nameModalState = null;
		setNameModalError("");
	};

	const openCreatePlaylistModal = (onComplete = null) => {
		openNameModal({ mode: "create", initialValue: "", onComplete });
	};

	const openRenamePlaylistModal = (playlistId) => {
		const target = playlists.find((pl) => pl.id === playlistId);
		if (!target) return;
		openNameModal({
			mode: "rename",
			initialValue: target.name,
			playlistId: target.id
		});
	};

	const openDeletePlaylistModal = (playlistId) => {
		const target = playlists.find((pl) => pl.id === playlistId);
		if (!target || !deleteModalBackdrop) return;
		pendingDeletePlaylistId = target.id;
		if (deleteMessageEl) {
			deleteMessageEl.textContent = `Are you sure you want to delete "${target.name}"? This cannot be undone.`;
		}
		deleteModalBackdrop.hidden = false;
		requestAnimationFrame(() => {
			if (cancelDeleteButton) cancelDeleteButton.focus();
		});
	};

	const closeDeletePlaylistModal = () => {
		if (!deleteModalBackdrop) return;
		deleteModalBackdrop.hidden = true;
		pendingDeletePlaylistId = null;
	};

	const deletePlaylist = (playlistId) => {
		const idx = playlists.findIndex((pl) => pl.id === playlistId);
		if (idx === -1) return;

		const [removed] = playlists.splice(idx, 1);
		savePlaylists();
		updatePlayerPlaylistButton();

		if (getActivePlaylistId() === playlistId) {
			setActiveView("all");
		} else {
			renderSidebarPlaylists();
			updatePlaylistHeader();
			renderTracks(search.value);
		}

		if (modalBackdrop && !modalBackdrop.hidden && pickerTrackIndex >= 0 && tracks[pickerTrackIndex]) {
			renderPlaylistPickerItems(tracks[pickerTrackIndex]);
		}

		status.textContent = `Deleted playlist "${removed.name}".`;
	};

	if (nameFormEl) {
		nameFormEl.addEventListener("submit", (event) => {
			event.preventDefault();
			if (!nameModalState || !nameInputEl) return;

			const trimmed = nameInputEl.value.trim();
			if (!trimmed) {
				setNameModalError("Please enter a playlist name.");
				nameInputEl.focus();
				return;
			}

			if (nameModalState.mode === "create") {
				const newPlaylist = {
					id: `pl_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
					name: trimmed,
					tracks: []
				};
				playlists.push(newPlaylist);
				savePlaylists();
				setActiveView(`playlist:${newPlaylist.id}`);
				status.textContent = `Created playlist "${newPlaylist.name}".`;
				const callback = nameModalState.onComplete;
				closeNameModal();
				if (typeof callback === "function") callback(newPlaylist);
			} else if (nameModalState.mode === "rename") {
				const target = playlists.find((pl) => pl.id === nameModalState.playlistId);
				if (target) {
					target.name = trimmed;
					savePlaylists();
					renderSidebarPlaylists();
					updatePlaylistHeader();
					renderQueueDrawer();
					status.textContent = `Renamed playlist to "${target.name}".`;
				}
				closeNameModal();
			}
		});
	}

	if (closeNameModalButton) {
		closeNameModalButton.addEventListener("click", closeNameModal);
	}

	if (cancelNameButton) {
		cancelNameButton.addEventListener("click", closeNameModal);
	}

	if (nameModalBackdrop) {
		nameModalBackdrop.addEventListener("click", (event) => {
			if (event.target === nameModalBackdrop) closeNameModal();
		});
	}

	if (closeDeleteModalButton) {
		closeDeleteModalButton.addEventListener("click", closeDeletePlaylistModal);
	}

	if (cancelDeleteButton) {
		cancelDeleteButton.addEventListener("click", closeDeletePlaylistModal);
	}

	if (deleteModalBackdrop) {
		deleteModalBackdrop.addEventListener("click", (event) => {
			if (event.target === deleteModalBackdrop) closeDeletePlaylistModal();
		});
	}

	if (confirmDeleteButton) {
		confirmDeleteButton.addEventListener("click", () => {
			const targetId = pendingDeletePlaylistId;
			closeDeletePlaylistModal();
			if (targetId) deletePlaylist(targetId);
		});
	}

	const toggleTrackInPlaylist = (playlistId, track) => {
		const pl = playlists.find((item) => item.id === playlistId);
		if (!pl || !track) return false;

		const key = getTrackKey(track);
		const idx = pl.tracks.indexOf(key);
		let added;
		if (idx === -1) {
			pl.tracks.push(key);
			added = true;
			status.textContent = `Added "${track.title}" to "${pl.name}".`;
		} else {
			pl.tracks.splice(idx, 1);
			added = false;
			status.textContent = `Removed "${track.title}" from "${pl.name}".`;
		}

		savePlaylists();
		updatePlaylistHeader();
		updatePlayerPlaylistButton();
		renderTracks(search.value);
		renderQueueDrawer();
		return added;
	};

	const openPlaylistModal = (trackIndex) => {
		const track = tracks[trackIndex];
		if (!track || !modalBackdrop) return;

		pickerTrackIndex = trackIndex;
		if (playlistModalSongEl) {
			playlistModalSongEl.textContent = `${track.title} — ${track.artist}`;
		}

		renderPlaylistPickerItems(track);
		modalBackdrop.hidden = false;
	};

	const renderPlaylistPickerItems = (track) => {
		if (!playlistPickerListEl) return;
		playlistPickerListEl.replaceChildren();

		if (!playlists.length) {
			const empty = document.createElement("p");
			empty.className = "muted";
			empty.textContent = "You don't have any playlists yet. Create one below!";
			playlistPickerListEl.append(empty);
			return;
		}

		const key = getTrackKey(track);
		playlists.forEach((pl) => {
			const alreadyIn = pl.tracks.includes(key);
			const btn = document.createElement("button");
			btn.type = "button";
			btn.className = `playlist-picker-item${alreadyIn ? " is-added" : ""}`;

			const nameSpan = document.createElement("span");
			nameSpan.textContent = pl.name;

			const badgeSpan = document.createElement("span");
			badgeSpan.className = "playlist-picker-badge";
			badgeSpan.textContent = alreadyIn ? "Added (Click to remove)" : "+ Add";

			btn.append(nameSpan, badgeSpan);
			btn.addEventListener("click", () => {
				toggleTrackInPlaylist(pl.id, track);
				renderPlaylistPickerItems(track);
			});

			playlistPickerListEl.append(btn);
		});
	};

	const closePlaylistModal = () => {
		if (!modalBackdrop) return;
		modalBackdrop.hidden = true;
		pickerTrackIndex = -1;
	};

	const toggleFavorite = (track) => {
		if (!track) return;
		const key = getTrackKey(track);
		const existingIndex = favoriteIds.indexOf(key);
		let added;

		if (existingIndex === -1) {
			favoriteIds.push(key);
			added = true;
		} else {
			favoriteIds.splice(existingIndex, 1);
			added = false;
		}

		saveFavorites();
		updateFavoriteButton();
		updatePlaylistHeader();
		renderTracks(search.value);
		renderQueueDrawer();
		status.textContent = added
			? `Added "${track.title}" to Favorites.`
			: `Removed "${track.title}" from Favorites.`;
	};

	const syncTrackVideo = () => {
		if (mediaCollapsed || !trackVideo.hasAttribute("src")) return;
		trackVideo.playbackRate = Number(playbackSpeedSelect?.value) || 1;
		if (audio.paused) {
			trackVideo.pause();
			return;
		}

		trackVideo.play().catch((error) => {
			if (error.name !== "AbortError") {
				console.error("Unable to play the track video:", error);
			}
		});
	};

	const applyMediaCollapseState = () => {
		if (!mediaStageEl) return;
		mediaStageEl.classList.toggle("is-collapsed", mediaCollapsed);
		if (mediaCollapsed) {
			trackVideo.pause();
		} else {
			syncTrackVideo();
		}
		if (toggleMediaCollapseButton) {
			toggleMediaCollapseButton.setAttribute("aria-expanded", String(!mediaCollapsed));
			toggleMediaCollapseButton.innerHTML = mediaCollapsed
				? '<i class="fa-solid fa-video" aria-hidden="true"></i> Expand Media'
				: '<i class="fa-solid fa-video-slash" aria-hidden="true"></i> Collapse Media';
		}
	};

	const applyLyricsSectionCollapseState = () => {
		if (!lyricsPanel) return;
		lyricsPanel.classList.toggle("is-section-collapsed", lyricsSectionCollapsed);
		if (toggleLyricsCollapseButton) {
			toggleLyricsCollapseButton.setAttribute("aria-expanded", String(!lyricsSectionCollapsed));
			toggleLyricsCollapseButton.innerHTML = lyricsSectionCollapsed
				? '<i class="fa-solid fa-chevron-up" aria-hidden="true"></i> Expand Lyrics'
				: '<i class="fa-solid fa-chevron-down" aria-hidden="true"></i> Collapse Lyrics';
		}
	};

	trackVideo.addEventListener("canplay", () => {
		trackVideo.hidden = false;
		document.querySelector("#lyrics-cover").hidden = true;
		syncTrackVideo();
	});

	trackVideo.addEventListener("error", () => {
		trackVideo.hidden = true;
		document.querySelector("#lyrics-cover").hidden = false;
	});

	// Converts audio time in seconds to a minutes:seconds display.
	const formatTime = (seconds) => {
		if (!Number.isFinite(seconds)) return "0:00";
		const minutes = Math.floor(seconds / 60);
		const remainder = Math.floor(seconds % 60).toString().padStart(2, "0");
		return `${minutes}:${remainder}`;
	};

	// Keeps the play/pause icon and accessible label in sync with playback.
	const updatePlayButton = () => {
		const playing = !audio.paused;
		playButton.innerHTML = playing ? '<i class="fa-solid fa-pause"></i>' : '<i class="fa-solid fa-play"></i>';
		playButton.setAttribute("aria-label", playing ? "Pause (Space)" : "Play (Space)");
		renderQueueDrawer();
	};

	// Rebuilds the visible song cards, applying the active view, search, and selected-song state.
	const renderTracks = (query = "") => {
		list.replaceChildren();
		const indices = getFilteredIndices(query);
		const activePlaylist = getActivePlaylist();

		indices.forEach((index) => {
			const track = tracks[index];
			const fav = isFavorite(track);
			const inAnyPl = isTrackInAnyPlaylist(track);

			const card = document.createElement("div");
			card.className = `track-card card${index === selectedIndex ? " is-current" : ""}`;
			card.setAttribute("role", "button");
			card.tabIndex = 0;
			card.setAttribute("aria-label", `Play ${track.title} by ${track.artist}`);

			const img = document.createElement("img");
			img.src = track.cover;
			img.alt = "";

			const body = document.createElement("div");
			body.className = "track-card-body";

			const meta = document.createElement("div");
			meta.className = "track-card-meta";

			const titleEl = document.createElement("strong");
			titleEl.textContent = track.title;

			const artistEl = document.createElement("span");
			artistEl.textContent = track.artist;

			meta.append(titleEl, artistEl);

			const actions = document.createElement("div");
			actions.className = "track-card-actions";

			const queueNextBtn = document.createElement("button");
			queueNextBtn.type = "button";
			queueNextBtn.className = "card-action-button";
			queueNextBtn.setAttribute("aria-label", `Queue ${track.title} to play next`);
			queueNextBtn.title = "Play next (add to queue)";
			queueNextBtn.innerHTML = '<i class="fa-solid fa-list-ol" aria-hidden="true"></i>';
			queueNextBtn.addEventListener("click", (event) => {
				event.stopPropagation();
				enqueueTrackNext(index);
			});

			const addPlBtn = document.createElement("button");
			addPlBtn.type = "button";
			addPlBtn.className = `card-action-button${inAnyPl ? " has-playlist" : ""}`;
			addPlBtn.setAttribute("aria-label", `Add ${track.title} to a playlist`);
			addPlBtn.title = "Add to playlist";
			addPlBtn.innerHTML = '<i class="fa-solid fa-plus" aria-hidden="true"></i>';
			addPlBtn.addEventListener("click", (event) => {
				event.stopPropagation();
				openPlaylistModal(index);
			});

			const favBtn = document.createElement("button");
			favBtn.type = "button";
			favBtn.className = `card-action-button${fav ? " is-favorite" : ""}`;
			favBtn.setAttribute("aria-pressed", String(fav));
			favBtn.setAttribute(
				"aria-label",
				fav ? `Remove ${track.title} from favorites` : `Add ${track.title} to favorites`
			);
			favBtn.title = fav ? "Remove from favorites" : "Add to favorites";
			favBtn.innerHTML = fav
				? '<i class="fa-solid fa-heart" aria-hidden="true"></i>'
				: '<i class="fa-regular fa-heart" aria-hidden="true"></i>';

			favBtn.addEventListener("click", (event) => {
				event.stopPropagation();
				toggleFavorite(track);
			});

			actions.append(queueNextBtn, addPlBtn, favBtn);

			if (activePlaylist) {
				const removeFromPlBtn = document.createElement("button");
				removeFromPlBtn.type = "button";
				removeFromPlBtn.className = "card-action-button";
				removeFromPlBtn.setAttribute("aria-label", `Remove ${track.title} from ${activePlaylist.name}`);
				removeFromPlBtn.title = `Remove from ${activePlaylist.name}`;
				removeFromPlBtn.innerHTML = '<i class="fa-solid fa-minus" aria-hidden="true"></i>';
				removeFromPlBtn.addEventListener("click", (event) => {
					event.stopPropagation();
					toggleTrackInPlaylist(activePlaylist.id, track);
				});
				actions.append(removeFromPlBtn);
			}

			body.append(meta, actions);
			card.append(img, body);

			card.addEventListener("click", () => selectTrack(index, true));
			card.addEventListener("keydown", (event) => {
				if (event.key === "Enter" || event.key === " ") {
					event.preventDefault();
					selectTrack(index, true);
				}
			});

			list.append(card);
		});

		if (!list.childElementCount) {
			const emptyState = document.createElement("p");
			emptyState.className = "muted";
			if (activeView === "favorites" && !query.trim()) {
				emptyState.textContent = "No favorite songs yet. Click the heart icon on any song to save it here.";
			} else if (activePlaylist && !query.trim()) {
				emptyState.textContent = `This playlist is empty. Click + on any song card to add tracks to "${activePlaylist.name}".`;
			} else {
				emptyState.textContent = "No songs match your search.";
			}
			list.append(emptyState);
		}
	};

	// Parses the selected song's timestamped lyrics and adds clickable lyric lines.
	const updateLyrics = () => {
		const track = tracks[selectedIndex];
		document.querySelector("#lyrics-title").textContent = track ? track.title : "Choose a song";
		document.querySelector("#lyrics-artist").textContent = track ? track.artist : "Your library";
		const lyricsCover = document.querySelector("#lyrics-cover");
		trackVideo.pause();
		trackVideo.hidden = true;
		trackVideo.removeAttribute("src");
		trackVideo.load();
		lyricsCover.hidden = !track;
		if (track) {
			lyricsCover.src = track.cover;
			if (track.video) {
				trackVideo.src = track.video;
				trackVideo.load();
			}
		} else {
			lyricsCover.removeAttribute("src");
		}
		lyricsCover.alt = track ? `${track.title} album artwork` : "";
		document.querySelector("#now-playing-backdrop").style.backgroundImage = track
			? `url("${track.cover}")`
			: "";
		lyricLines = [];
		activeLyricIndex = -1;
		lyricsContent.replaceChildren();
		lyricsPanel.classList.add("is-collapsed");
		toggleLyricsButton.textContent = "Show more";
		toggleLyricsButton.setAttribute("aria-expanded", "false");
		toggleLyricsButton.hidden = true;

		if (!track?.lyrics.trim()) {
			const placeholder = document.createElement("p");
			placeholder.className = "lyrics-placeholder";
			placeholder.textContent = "Timed lyrics haven’t been added for this track yet.";
			lyricsContent.append(placeholder);
			applyMediaCollapseState();
			applyLyricsSectionCollapseState();
			return;
		}

		const timestampPattern = /\[(\d{1,2}):(\d{2})(?:\.(\d{1,3}))?\]/g;
		for (const sourceLine of track.lyrics.split(/\r?\n/)) {
			const timestamps = [...sourceLine.matchAll(timestampPattern)];
			const text = sourceLine.replace(timestampPattern, "").trim();
			if (!text || !timestamps.length) continue;

			for (const match of timestamps) {
				const fraction = match[3] ? Number(`0.${match[3]}`) : 0;
				lyricLines.push({
					time: Number(match[1]) * 60 + Number(match[2]) + fraction,
					text
				});
			}
		}

		lyricLines.sort((a, b) => a.time - b.time);
		if (!lyricLines.length) {
			const placeholder = document.createElement("p");
			placeholder.className = "lyrics-placeholder";
			placeholder.textContent = "No timestamped lines found. Add lyrics in LRC format to sync them with the song.";
			lyricsContent.append(placeholder);
			applyMediaCollapseState();
			applyLyricsSectionCollapseState();
			return;
		}

		lyricLines.forEach((line) => {
			const button = document.createElement("button");
			button.className = "lyrics-line";
			button.type = "button";
			button.textContent = line.text;
			button.addEventListener("click", () => {
				audio.currentTime = line.time;
				audio.play().catch((error) => {
					status.textContent = "Unable to play from that lyric line.";
					console.error("Audio playback failed:", error);
				});
			});
			line.element = button;
			lyricsContent.append(button);
		});
		toggleLyricsButton.hidden = false;
		applyMediaCollapseState();
		applyLyricsSectionCollapseState();
	};

	// Highlights and scrolls to the lyric line matching the current playback time.
	const updateActiveLyric = () => {
		let nextIndex = -1;
		for (let index = 0; index < lyricLines.length; index += 1) {
			if (lyricLines[index].time > audio.currentTime) break;
			nextIndex = index;
		}

		if (nextIndex === activeLyricIndex) return;
		if (activeLyricIndex >= 0) {
			lyricLines[activeLyricIndex].element.classList.remove("is-active");
			lyricLines[activeLyricIndex].element.removeAttribute("aria-current");
		}
		activeLyricIndex = nextIndex;
		if (activeLyricIndex >= 0) {
			const line = lyricLines[activeLyricIndex].element;
			line.classList.add("is-active");
			line.setAttribute("aria-current", "true");
			line.scrollIntoView({ block: "nearest", behavior: "smooth" });
		}
	};

	// Loads a song, updates player details, and optionally starts playback.
	const selectTrack = async (index, shouldPlay) => {
		const track = tracks[index];
		if (!track) return;

		selectedIndex = index;
		repeatConsumed = false;
		audio.src = track.audio;
		applyPlaybackSpeed();
		document.querySelector("#current-cover").src = track.cover;
		document.querySelector("#current-cover").alt = `${track.title} album artwork`;
		document.querySelector("#current-title").textContent = track.title;
		document.querySelector("#current-artist").textContent = track.artist;
		document.querySelector("#elapsed-time").textContent = "0:00";
		document.querySelector("#total-time").textContent = "0:00";
		seekBar.value = "0";
		seekBar.disabled = true;
		status.textContent = "";
		updateFavoriteButton();
		updatePlayerPlaylistButton();
		updateLyrics();
		renderTracks(search.value);
		renderQueueDrawer();

		if (shouldPlay) {
			try {
				await audio.play();
			} catch (error) {
				status.textContent = `Unable to play ${track.title}. Check that its audio file is available.`;
				console.error("Audio playback failed:", error);
			}
		}
	};

	// Moves through the manual queue first, then the visible/active song list.
	const skipTrack = (offset) => {
		if (offset > 0 && manualQueue.length > 0) {
			const nextQueuedIdx = manualQueue.shift();
			selectTrack(nextQueuedIdx, true);
			return;
		}

		const filtered = getFilteredIndices(search.value);
		const candidates = filtered.length ? filtered : tracks.map((_, i) => i);
		if (!candidates.length) return;

		const currentPos = candidates.indexOf(selectedIndex);
		let nextCandidatePos;

		if (currentPos < 0) {
			nextCandidatePos = 0;
		} else if (shuffleEnabled && offset > 0 && candidates.length > 1) {
			do {
				nextCandidatePos = Math.floor(Math.random() * candidates.length);
			} while (nextCandidatePos === currentPos);
		} else {
			nextCandidatePos = (currentPos + offset + candidates.length) % candidates.length;
		}

		selectTrack(candidates[nextCandidatePos], true);
	};

	const updateModeButtons = () => {
		shuffleButton.classList.toggle("is-active", shuffleEnabled);
		shuffleButton.setAttribute("aria-pressed", String(shuffleEnabled));
		shuffleButton.setAttribute("aria-label", shuffleEnabled ? "Disable shuffle" : "Enable shuffle");
		shuffleButton.title = shuffleEnabled ? "Shuffle on" : "Shuffle off";

		repeatButton.classList.toggle("is-active", repeatOnceEnabled);
		repeatButton.setAttribute("aria-pressed", String(repeatOnceEnabled));
		repeatButton.setAttribute("aria-label", repeatOnceEnabled ? "Turn repeat once off" : "Repeat current song once");
		repeatButton.title = repeatOnceEnabled ? "Repeat once on" : "Repeat once";
		renderQueueDrawer();
	};

	const togglePlayPause = async () => {
		if (selectedIndex < 0) {
			const firstVisible = getFilteredIndices(search.value)[0] ?? 0;
			await selectTrack(firstVisible, true);
		} else if (audio.paused) {
			try {
				await audio.play();
				status.textContent = "";
			} catch (error) {
				status.textContent = "Unable to resume playback. Check that the audio file is available.";
				console.error("Audio playback failed:", error);
			}
		} else {
			audio.pause();
		}
	};

	const toggleMute = () => {
		audio.muted = !audio.muted;
		if (!audio.muted && audio.volume === 0) {
			audio.volume = previousVolume || 0.75;
			volumeBar.value = String(audio.volume);
		}
		muteButton.innerHTML = audio.muted ? '<i class="fa-solid fa-volume-xmark"></i>' : '<i class="fa-solid fa-volume-high"></i>';
		muteButton.setAttribute("aria-label", audio.muted ? "Unmute (M)" : "Mute (M)");
	};

	const setNowPlayingPanelOpen = (willOpen) => {
		const isMobile = window.matchMedia("(max-width: 760px)").matches;
		nowPlayingPanel.hidden = !willOpen;
		nowPlayingPanel.classList.toggle("is-mobile-open", isMobile && willOpen);
		document.body.classList.toggle("now-playing-hidden", !willOpen);
		nowPlayingButton.setAttribute("aria-expanded", String(willOpen));

		if (nowPlayingCollapseButton) {
			nowPlayingCollapseButton.setAttribute("aria-expanded", String(willOpen));
			nowPlayingCollapseButton.setAttribute(
				"aria-label",
				willOpen ? "Collapse now playing panel" : "Expand now playing panel"
			);
			nowPlayingCollapseButton.innerHTML = willOpen
				? '<i class="fa-solid fa-angles-right" aria-hidden="true"></i> Collapse'
				: '<i class="fa-solid fa-angles-left" aria-hidden="true"></i> Expand';
		}
	};

	// Switch between All Songs ("all") and Favorites ("favorites") in the sidebar.
	navTabs.forEach((tabBtn) => {
		tabBtn.addEventListener("click", () => {
			setActiveView(tabBtn.dataset.view || "all");
		});
	});

	if (createPlaylistButton) {
		createPlaylistButton.addEventListener("click", () => openCreatePlaylistModal());
	}

	if (renamePlaylistButton) {
		renamePlaylistButton.addEventListener("click", () => {
			const activeId = getActivePlaylistId();
			if (activeId) openRenamePlaylistModal(activeId);
		});
	}

	if (deletePlaylistButton) {
		deletePlaylistButton.addEventListener("click", () => {
			const activeId = getActivePlaylistId();
			if (activeId) openDeletePlaylistModal(activeId);
		});
	}

	if (favoriteButton) {
		favoriteButton.addEventListener("click", () => {
			if (selectedIndex >= 0) {
				toggleFavorite(tracks[selectedIndex]);
			}
		});
	}

	if (addToPlaylistButton) {
		addToPlaylistButton.addEventListener("click", () => {
			if (selectedIndex >= 0) {
				openPlaylistModal(selectedIndex);
			}
		});
	}

	if (queueDrawerButton) {
		queueDrawerButton.addEventListener("click", () => toggleQueueDrawer());
	}

	if (closeQueueDrawerButton) {
		closeQueueDrawerButton.addEventListener("click", () => toggleQueueDrawer(false));
	}

	if (clearQueueButton) {
		clearQueueButton.addEventListener("click", () => {
			manualQueue = [];
			renderQueueDrawer();
			status.textContent = "Cleared queued songs.";
		});
	}

	if (playbackSpeedSelect) {
		playbackSpeedSelect.addEventListener("change", () => {
			applyPlaybackSpeed();
			status.textContent = `Playback speed set to ${playbackSpeedSelect.value}x.`;
		});
	}

	if (sleepTimerSelect) {
		sleepTimerSelect.addEventListener("change", () => {
			setSleepTimerMode(sleepTimerSelect.value);
		});
	}

	if (closePlaylistModalButton) {
		closePlaylistModalButton.addEventListener("click", closePlaylistModal);
	}

	if (modalBackdrop) {
		modalBackdrop.addEventListener("click", (event) => {
			if (event.target === modalBackdrop) closePlaylistModal();
		});
	}

	if (modalNewPlaylistButton) {
		modalNewPlaylistButton.addEventListener("click", () => {
			const track = tracks[pickerTrackIndex];
			openCreatePlaylistModal((created) => {
				if (created && track) {
					toggleTrackInPlaylist(created.id, track);
					renderPlaylistPickerItems(track);
				}
			});
		});
	}

	// Keyboard Shortcuts (Space, ArrowLeft, ArrowRight, M, Escape)
	document.addEventListener("keydown", (event) => {
		if (event.key === "Escape") {
			if (deleteModalBackdrop && !deleteModalBackdrop.hidden) {
				closeDeletePlaylistModal();
			} else if (nameModalBackdrop && !nameModalBackdrop.hidden) {
				closeNameModal();
			} else if (modalBackdrop && !modalBackdrop.hidden) {
				closePlaylistModal();
			} else if (queueDrawerEl && !queueDrawerEl.hidden) {
				toggleQueueDrawer(false);
			}
			return;
		}

		const target = event.target;
		const isTypingField =
			target &&
			(target.tagName === "INPUT" ||
				target.tagName === "TEXTAREA" ||
				target.tagName === "SELECT" ||
				target.isContentEditable);

		if (isTypingField || event.metaKey || event.ctrlKey || event.altKey) return;

		if (event.code === "Space") {
			// Avoid double-triggering if focus is already on a button
			if (target && target.tagName === "BUTTON") return;
			event.preventDefault();
			togglePlayPause();
		} else if (event.key === "ArrowLeft") {
			event.preventDefault();
			if (event.shiftKey) {
				if (audio.currentTime > 3) {
					audio.currentTime = 0;
				} else {
					skipTrack(-1);
				}
			} else if (Number.isFinite(audio.duration)) {
				audio.currentTime = Math.max(0, audio.currentTime - 5);
			}
		} else if (event.key === "ArrowRight") {
			event.preventDefault();
			if (event.shiftKey) {
				skipTrack(1);
			} else if (Number.isFinite(audio.duration)) {
				audio.currentTime = Math.min(audio.duration, audio.currentTime + 5);
			}
		} else if (event.key === "m" || event.key === "M") {
			event.preventDefault();
			toggleMute();
		}
	});

	// Shuffle changes the next-song selection; repeat once replays the current
	// song one additional time, then automatically turns itself off.
	shuffleButton.addEventListener("click", () => {
		shuffleEnabled = !shuffleEnabled;
		updateModeButtons();
		status.textContent = shuffleEnabled ? "Shuffle is on." : "Shuffle is off.";
	});

	repeatButton.addEventListener("click", () => {
		repeatOnceEnabled = !repeatOnceEnabled;
		repeatConsumed = false;
		updateModeButtons();
		status.textContent = repeatOnceEnabled
			? "This song will repeat one time."
			: "Repeat once is off.";
	});

	// Filter song cards as the user types in the search field.
	search.addEventListener("input", () => {
		renderTracks(search.value);
		renderQueueDrawer();
	});

	// Start, resume, or pause playback from the main player button.
	playButton.addEventListener("click", togglePlayPause);

	// Go back to the start of the current song, or the previous song if near the start.
	document.querySelector("#previous-button").addEventListener("click", () => {
		if (audio.currentTime > 3) {
			audio.currentTime = 0;
			return;
		}
		skipTrack(-1);
	});

	// The next button and a song ending both advance to the next track.
	document.querySelector("#next-button").addEventListener("click", () => skipTrack(1));

	// Keep player controls, timing, and synchronized lyrics updated with audio events.
	audio.addEventListener("play", () => {
		updatePlayButton();
		syncTrackVideo();
	});
	audio.addEventListener("pause", () => {
		updatePlayButton();
		trackVideo.pause();
	});
	audio.addEventListener("ended", () => {
		if (sleepMode === "end") {
			triggerSleepPause("Sleep timer: paused at end of song.");
			return;
		}

		if (repeatOnceEnabled && !repeatConsumed) {
			repeatConsumed = true;
			audio.currentTime = 0;
			audio.play().catch((error) => {
				status.textContent = "Unable to replay this song.";
				console.error("Audio replay failed:", error);
			});
			status.textContent = "Repeating this song once.";
			return;
		}

		// The one extra repeat has been used; turn the mode off before moving on.
		if (repeatOnceEnabled && repeatConsumed) {
			repeatOnceEnabled = false;
			repeatConsumed = false;
			updateModeButtons();
			status.textContent = "Repeat once completed.";
		}
		skipTrack(1);
	});
	audio.addEventListener("loadedmetadata", () => {
		seekBar.disabled = !Number.isFinite(audio.duration);
		document.querySelector("#total-time").textContent = formatTime(audio.duration);
	});
	audio.addEventListener("timeupdate", () => {
		document.querySelector("#elapsed-time").textContent = formatTime(audio.currentTime);
		if (Number.isFinite(audio.duration) && audio.duration > 0) {
			seekBar.value = String(Math.round((audio.currentTime / audio.duration) * 1000));
		}
		updateActiveLyric();
	});
	audio.addEventListener("error", () => {
		if (selectedIndex >= 0) {
			status.textContent = `Couldn't load ${tracks[selectedIndex].title}. Check the audio file path.`;
		}
	});

	// Change the audio position when the user moves the seek slider.
	seekBar.addEventListener("input", () => {
		if (Number.isFinite(audio.duration)) {
			audio.currentTime = (Number(seekBar.value) / 1000) * audio.duration;
		}
	});

	// Apply the volume slider value and update the mute button's state.
	volumeBar.addEventListener("input", () => {
		audio.volume = Number(volumeBar.value);
		audio.muted = audio.volume === 0;
		muteButton.innerHTML = audio.muted ? '<i class="fa-solid fa-volume-xmark"></i>' : '<i class="fa-solid fa-volume-high"></i>';
		muteButton.setAttribute("aria-label", audio.muted ? "Unmute (M)" : "Mute (M)");
		if (audio.volume > 0) previousVolume = audio.volume;
	});

	// Toggle mute and restore the previous volume when unmuting from zero.
	muteButton.addEventListener("click", toggleMute);

	// Toggle the now-playing sidebar or reveal it as a mobile overlay.
	nowPlayingButton.addEventListener("click", () => {
		const isMobile = window.matchMedia("(max-width: 760px)").matches;
		const currentlyOpen = isMobile
			? nowPlayingPanel.classList.contains("is-mobile-open") && !nowPlayingPanel.hidden
			: !nowPlayingPanel.hidden;
		setNowPlayingPanelOpen(!currentlyOpen);
	});

	if (nowPlayingCollapseButton) {
		nowPlayingCollapseButton.addEventListener("click", () => {
			setNowPlayingPanelOpen(false);
		});
	}

	toggleLyricsButton.addEventListener("click", () => {
		const isExpanded = lyricsPanel.classList.toggle("is-collapsed") === false;
		toggleLyricsButton.textContent = isExpanded ? "Show less" : "Show more";
		toggleLyricsButton.setAttribute("aria-expanded", String(isExpanded));
	});

	if (toggleMediaCollapseButton) {
		toggleMediaCollapseButton.addEventListener("click", () => {
			mediaCollapsed = !mediaCollapsed;
			applyMediaCollapseState();
		});
	}

	if (toggleLyricsCollapseButton) {
		toggleLyricsCollapseButton.addEventListener("click", () => {
			lyricsSectionCollapsed = !lyricsSectionCollapsed;
			applyLyricsSectionCollapseState();
		});
	}

	// Set the initial volume, speed, saved data states, and render songs when the page loads.
	audio.volume = Number(volumeBar.value);
	applyPlaybackSpeed();
	updateModeButtons();
	updateFavoriteButton();
	updatePlayerPlaylistButton();
	renderSidebarPlaylists();
	updatePlaylistHeader();
	renderTracks();
	renderQueueDrawer();
	updateLyrics();
}