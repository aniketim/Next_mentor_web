
export const Google = ({
  width,
  height,
}: {
  width: number;
  height: number;
}) => {
  return (
    <svg width={width} height={height} viewBox='0 0 48 48'>
      <g fill='none' fillRule='evenodd'>
        <g>
          <path
            d='M9.827,24c0-1.524.253-2.986.705-4.356L2.623,13.604C1.082,16.734.214,20.26.214,24c0,3.736.868,7.261 2.62,10.388l7.905-6.051c-.447-1.364-.697-2.82-.697-4.337'
            fill='#FBBC05'
          />
          <path
            d='M23.714,10.133c3.312,0 6.306,1.174 8.656,3.094l6.836-6.826C35.036,2.773 29.695.533 23.714.533c-9.287,0-17.268,5.311-21.09,13.071l7.909,6.04c1.823-5.531 7.018-9.51 13.095-9.51'
            fill='#EB4335'
          />
          <path
            d='M23.714,37.867c-6.164,0-11.358-3.978-13.18-9.51l-7.909,6.038c3.822,7.761 11.804,13.072 21.09,13.072 5.732,0 11.205-2.035 15.312-5.848l-7.508-5.804c-2.118,1.335-4.785,2.053-7.804,2.053'
            fill='#34A853'
          />
          <path
            d='M46.145,24c0-1.387-.214-2.88-.534-4.267L23.714,19.733v9.067h12.605c-.631,3.091-2.346,5.468-4.8,7.015l7.507,5.804c4.315-4.004 7.121-9.969 7.121-17.619'
            fill='#4285F4'
          />
        </g>
      </g>
    </svg>
  );
};

export const Dashboard = ({
  width,
  height,
  strokeColor,
}: {
  width: number;
  height: number;
  strokeColor: string;
}) => {
  return (
    <svg width={width} height={height} viewBox='0 -0.5 25 25' fill='none'>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M9.918 10.0005H7.082C6.66587 9.99708 6.26541 10.1591 5.96873 10.4509C5.67204 10.7427 5.50343 11.1404 5.5 11.5565V17.4455C5.5077 18.3117 6.21584 19.0078 7.082 19.0005H9.918C10.3341 19.004 10.7346 18.842 11.0313 18.5502C11.328 18.2584 11.4966 17.8607 11.5 17.4445V11.5565C11.4966 11.1404 11.328 10.7427 11.0313 10.4509C10.7346 10.1591 10.3341 9.99708 9.918 10.0005Z'
        stroke={strokeColor}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M9.918 4.0006H7.082C6.23326 3.97706 5.52559 4.64492 5.5 5.4936V6.5076C5.52559 7.35629 6.23326 8.02415 7.082 8.0006H9.918C10.7667 8.02415 11.4744 7.35629 11.5 6.5076V5.4936C11.4744 4.64492 10.7667 3.97706 9.918 4.0006Z'
        stroke={strokeColor}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M15.082 13.0007H17.917C18.3333 13.0044 18.734 12.8425 19.0309 12.5507C19.3278 12.2588 19.4966 11.861 19.5 11.4447V5.55666C19.4966 5.14054 19.328 4.74282 19.0313 4.45101C18.7346 4.1592 18.3341 3.9972 17.918 4.00066H15.082C14.6659 3.9972 14.2654 4.1592 13.9687 4.45101C13.672 4.74282 13.5034 5.14054 13.5 5.55666V11.4447C13.5034 11.8608 13.672 12.2585 13.9687 12.5503C14.2654 12.8421 14.6659 13.0041 15.082 13.0007Z'
        stroke={strokeColor}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M15.082 19.0006H17.917C18.7661 19.0247 19.4744 18.3567 19.5 17.5076V16.4936C19.4744 15.6449 18.7667 14.9771 17.918 15.0006H15.082C14.2333 14.9771 13.5256 15.6449 13.5 16.4936V17.5066C13.525 18.3557 14.2329 19.0241 15.082 19.0006Z'
        stroke={strokeColor}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export const Profile = ({
  width,
  height,
  strokeColor,
}: {
  width: number;
  height: number;
  strokeColor: string;
}) => {
  return (
    <svg width={width} height={height} viewBox='0 -0.5 25 25' fill='none'>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M15.5 8C15.5 9.65685 14.1569 11 12.5 11C10.8431 11 9.5 9.65685 9.5 8C9.5 6.34315 10.8431 5 12.5 5C13.2956 5 14.0587 5.31607 14.6213 5.87868C15.1839 6.44129 15.5 7.20435 15.5 8Z'
        stroke={strokeColor}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M16 14H9C7.61929 14 6.5 15.1193 6.5 16.5C6.5 17.8807 7.61929 19 9 19H16C17.3807 19 18.5 17.8807 18.5 16.5C18.5 15.1193 17.3807 14 16 14V14Z'
        stroke={strokeColor}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};
